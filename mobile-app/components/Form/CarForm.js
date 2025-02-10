import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ProgressBar as PaperProgressBar, TextInput } from 'react-native-paper';
import axios from "axios";
import { CarContext } from "../../CarContext";
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

export const CarForm = ({ setcurrentForm, handleChange, formData, setFormData }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { setShouldRefetch } = useContext(CarContext);
    const url = process.env.EXPO_PUBLIC_API_URL + "/api/cars";
    const [image, setImage] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getDeviceId = async () => {
            try {
                let storedDeviceId = await SecureStore.getItemAsync('deviceId');
                if (!storedDeviceId) {
                    storedDeviceId = await Crypto.digestStringAsync(
                        Crypto.CryptoDigestAlgorithm.SHA256,
                        Device.brand + Device.modelName + Math.random().toString()
                    );
                    await SecureStore.setItemAsync('deviceId', storedDeviceId);
                }
                setDeviceId(storedDeviceId);
                setIsLoading(false);
            } catch (error) {
                console.log("Error getting device ID:", error);
            }
        };

        getDeviceId();
    }, []);

    const handleSubmit = async () => {
        if (!deviceId) {
            console.log("Device ID is not ready");
            return;
        }

        if (!formData.carModel || !formData.manufactureYear || !formData.licensePlateNumber || !formData.image?.uri) {
            setError("Please fill all the fields before continuing.");
            return;
        }

        try {
            setLoading(true);
            setError(""); // Reset error state

            const newFormData = new FormData();
            newFormData.append("carModel", formData.carModel);
            newFormData.append("email", formData.email);
            newFormData.append("phone", formData.phone);
            newFormData.append("firstName", formData.firstName);
            newFormData.append("lastName", formData.lastName);
            newFormData.append("manufactureYear", formData.manufactureYear);
            newFormData.append("licensePlateNumber", formData.licensePlateNumber);
            newFormData.append("image", {
                uri: formData.image.uri,
                type: "image/jpeg",
                name: "image.jpg"
            });
            newFormData.append("deviceId", deviceId);

            const response = await axios.post(url, newFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
        } catch (err) {
            console.log("Error:", err.response ? err.response.data : err.message);
            setError("Submission failed. Please try again.");
        } finally {
            setLoading(false);
            setShouldRefetch(true);
            navigation.navigate('Dashboard');
            setFormData({});
        }
    };

    const getPermission = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraPermission.status !== "granted" || mediaPermission.status !== "granted") {
            alert("Permissions are required to access the camera and media library!");
            return false;
        }
        return true;
    };

    const handleImageSelection = async (source) => {
        const hasPermission = await getPermission();
        if (!hasPermission) return;
        let result;
        if (source === "camera") {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });
        }

        if (!result.canceled && result.assets) {
            const uri = result.assets[0].uri;
            setImage(uri);
            updateFormData(uri);
        }
    };

    const updateFormData = (imageUri) => {
        handleChange("image", {
            uri: imageUri,
            type: "image/jpeg",
            name: "image.jpg"
        });
    };

    return (
        <View style={styles.container}>
            <PaperProgressBar progress={1} color="#1F87FE" style={styles.progress} />
            <Text style={styles.title}>Personalize your experience</Text>
            <Text style={styles.smallText}>Please fill in car information</Text>
            <TextInput onChangeText={(text) => handleChange("carModel", text)} outlineColor='lightgrey' activeOutlineColor='#1F87FE' mode='outlined' label="Car Model" style={styles.input} />
            <TextInput onChangeText={(text) => handleChange("manufactureYear", text)} outlineColor='lightgrey' activeOutlineColor='#1F87FE' mode='outlined' label="Manufacture Year" style={styles.input} />
            <TextInput onChangeText={(text) => handleChange("licensePlateNumber", text)} outlineColor='lightgrey' activeOutlineColor='#1F87FE' mode='outlined' label="License Plate Number" style={styles.input} />

            <TouchableOpacity onPress={() => handleImageSelection("camera")} style={styles.button}>
                <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleImageSelection("gallery")} style={styles.button}>
                <Text style={styles.text}>Choose from Gallery</Text>
            </TouchableOpacity>

            {image && (
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TouchableOpacity onPress={() => setImage(null)} style={styles.changeButton}>
                        <Text style={styles.text}>Change Photo</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Button onPress={() => setcurrentForm(0)} title="Previous" color="#007BFF" />

            <Button onPress={handleSubmit} title={loading ? "Sending..." : "Send"} color="green" disabled={loading} />

            {loading && <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 10 }} />}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: "100%", alignItems: "center", padding: 20 },
    progress: { margin: 10, width: 327, height: 8 },
    button: { backgroundColor: "#007BFF", padding: 15, borderRadius: 8, alignItems: "center", marginVertical: 10 },
    title: { fontSize: 25, fontWeight: "bold" },
    smallText: { color: "grey", textAlign: "right" },
    imageWrapper: { marginTop: 20, alignItems: "center" },
    image: { width: 100, height: 100, borderRadius: 10 },
    errorText: { color: "red", marginTop: 10 },
    text: { color: "#fff" },
    input: { height: 40, backgroundColor: "#fff", padding: 10, marginBottom: 20, marginTop: 20, width: '80%' },
});

export default CarForm;
