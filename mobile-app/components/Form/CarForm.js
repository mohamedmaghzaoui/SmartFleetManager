import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ProgressBar as PaperProgressBar, TextInput } from 'react-native-paper';

export const CarForm = ({ setcurrentForm, handleChange, formData }) => {
    console.log(formData)
    const [images, setImages] = useState([]);

    // Function to request permissions for camera and media library
    const getPermission = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraPermission.status !== "granted" || mediaPermission.status !== "granted") {
            alert("Permissions are required to access the camera and media library!");
            return false;
        }
        return true;
    };

    // Function to handle image selection and update formData
    const handleImageSelection = async (source) => {
        const hasPermission = await getPermission();
        if (!hasPermission) return;

        if (images.length >= 3) {
            alert("You can only pick up to 3 images!");
            return;
        }

        let result;
        if (source === "camera") {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                selectionLimit: 3 - images.length,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });
        }

        if (!result.canceled && result.assets) {
            const uris = result.assets.map((asset) => asset.uri);
            setImages((prevImages) => {
                const newImages = [...prevImages, ...uris].slice(0, 3);
                updateFormData(newImages);
                return newImages;
            });
        }
    };

    // Function to update formData with selected images
    const updateFormData = (imageUris) => {
        handleChange("images", imageUris.map((uri, index) => ({
            uri,
            type: "image/jpeg",
            name: `image_${index + 1}.jpg`
        })));
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

            <ScrollView contentContainerStyle={styles.imageContainer}>
                {images.map((uri, index) => (
                    <View key={index} style={styles.imageWrapper}>
                        <Image source={{ uri }} style={styles.image} />
                    </View>
                ))}
            </ScrollView>

            <Button
                onPress={() => setcurrentForm(0)}
                title="previous"
                color="#007BFF"
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
    imageContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    imageWrapper: {
        margin: 5,
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
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
