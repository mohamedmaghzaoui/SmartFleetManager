import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ProgressBar as PaperProgressBar, TextInput } from 'react-native-paper';
import axios from "axios";
import { CarContext } from "../../CarContext";
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store'; // Importing expo-secure-store for secure storage

import * as Crypto from 'expo-crypto'
export const CarForm = ({ setcurrentForm, handleChange, formData }) => {
    const navigation = useNavigation();
    const {setShouldRefetch}=useContext(CarContext)
    const url = process.env.EXPO_PUBLIC_API_URL + "api/cars"; // Flask backend URL
    const [image, setImage] = useState(null); // Store only one image URI
    const [deviceId, setDeviceId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // Loading state for deviceId

    useEffect(() => {
        const getDeviceId = async () => {
            try {
                

                // Try to get the device ID from secure storage
                let storedDeviceId = await SecureStore.getItemAsync('deviceId');
                if (!storedDeviceId) {
                    console.log("No device ID found, generating a new one...");
                    // If there's no device ID stored, generate one using Expo Random
                    storedDeviceId = await Crypto.digestStringAsync(
                        Crypto.CryptoDigestAlgorithm.SHA256,
                        Device.brand + Device.modelName + Math.random().toString()
                      );
                    await SecureStore.setItemAsync('deviceId', storedDeviceId);
                    console.log("New device ID generated:", storedDeviceId);
                } else {
                    console.log("Device ID found in storage:", storedDeviceId);
                }
                setDeviceId(storedDeviceId);  // Set the device ID to state
                setIsLoading(false);  // Set loading to false when device ID is ready
            } catch (error) {
                console.log("Error getting device ID:", error);
            }
        };

        getDeviceId();  // Call the function to fetch or generate device ID
    }, []);

    const handleSubmit = async () => {
        // Check if deviceId is ready before sending the request
        if (!deviceId) {
            console.log("Device ID is not ready");
            return;
        }

        try {
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
            newFormData.append("deviceId", deviceId);  // Attach the device ID to the request

            const response = await axios.post(url, newFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
        } catch (err) {
            console.log("Error:", err.response ? err.response.data : err.message);
        }finally{
            setShouldRefetch(true)
            navigation.navigate('Dashboard');

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
            <Text style={styles.title}>Personalise your experience</Text>
            <Text style={styles.smallText}>Please Fill car information</Text>

            <TextInput onChangeText={(text) => handleChange("carModel", text)} outlineColor='lightgrey' activeOutlineColor='#1F87FE' mode='outlined' label={"Car Model"} style={styles.input} />
            <TextInput onChangeText={(text) => handleChange("manufactureYear", text)} outlineColor='lightgrey' activeOutlineColor='#1F87FE' mode='outlined' label={"Manufacture year"} style={styles.input} />
            <TextInput onChangeText={(text) => handleChange("licensePlateNumber", text)} outlineColor='lightgrey' activeOutlineColor='#1F87FE' mode='outlined' label={"License Plate Number"} style={styles.input} />

            {/* Button to take photo */}
            <TouchableOpacity onPress={() => handleImageSelection("camera")} style={styles.button}>
                <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>

            {/* Button to select image from gallery */}
            <TouchableOpacity onPress={() => handleImageSelection("gallery")} style={styles.button}>
                <Text style={styles.text}>Choose from Gallery</Text>
            </TouchableOpacity>

            {/* Display selected image */}
            {image && (
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TouchableOpacity onPress={() => setImage(null)} style={styles.changeButton}>
                        <Text style={styles.text}>Change Photo</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Button
                onPress={() => setcurrentForm(0)}
                title="previous"
                color="#007BFF"
            />
            {/* Disable the button until the device ID is ready */}
            <Button
                onPress={() => handleSubmit()}  // Ensure deviceId is ready before submitting
                title={isLoading ? "Loading..." : "Send"}  // Show 'Loading...' while waiting for deviceId
                color={isLoading ? "#ddd" : "green"}
                disabled={isLoading}  // Disable the button if deviceId is not ready
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        padding: 20,
    },
    progress: {
        margin: 10,
        width: 327,
        height: 8,
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    },
    smallText: {
        color: "grey",
        textAlign: "right"
    },
    imageWrapper: {
        marginTop: 20,
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    changeButton: {
        marginTop: 10,
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    text: {
        color: "#fff",
    },
    input: {
        height: 40,
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 20,
        marginTop: 20,
        width: '80%',
    },
});
