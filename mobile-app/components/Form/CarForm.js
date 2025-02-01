import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ProgressBar as PaperProgressBar,TextInput } from 'react-native-paper';

export const CarForm = ({setcurrentForm,handleChange,formData}) => {
    const [images, setImages] = useState([]);
    console.log(formData)

    // Function to request permissions for both camera and media library
    const getPermission = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraPermission.status !== "granted" || mediaPermission.status !== "granted") {
            alert("Permissions are required to access the camera and media library!");
            return false;
        }
        return true;
    };

    // Function to capture image from camera
    const captureImage = async () => {
        const hasPermission = await getPermission();
        if (!hasPermission) return;

        if (images.length >= 3) {
            alert("You can only pick up to 3 images!");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,  // Enable cropping
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            const uri = result.assets[0].uri;
            setImages((prevImages) => {
                // Check if the image is already in the list
                if (prevImages.length < 3 && !prevImages.includes(uri)) {
                    return [...prevImages, uri];
                }
                return prevImages;
            });  // Add new image
        }
    };

    // Function to select image from the gallery
    const selectImageFromGallery = async () => {
        const hasPermission = await getPermission();
        if (!hasPermission) return;

        if (images.length >= 3) {
            alert("You can only pick up to 3 images!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            selectionLimit: 3 - images.length,  // Allow only the remaining number of images to be selected
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            const uris = result.assets.map((asset) => asset.uri);  // Extract URIs from selected images
            setImages((prevImages) => {
                // Add the selected images but only up to the limit of 3
                const newImages = [...prevImages, ...uris];
                return newImages.slice(0, 3); // Make sure only 3 images are kept
            });
        }
    };

    // Function to upload an image
    const uploadImage = async (imageUri) => {
        let formData = new FormData();
        formData.append("file", {
            uri: imageUri,
            type: "image/jpeg",  // Assuming JPEG format
            name: "upload.jpg",
        });

        try {
            const response = await fetch("https://your-server-url.com/upload", {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.ok) {
                alert("Image uploaded successfully!");
            } else {
                alert("Upload failed!");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("An error occurred while uploading");
        }
    };

    return (
        <View style={styles.container}>
            
            <PaperProgressBar progress={1} color="#1F87FE" style={styles.progress}/>
            <Text style={styles.title}>Personalise your experience</Text>
            <Text style={styles.smallText}>Please Fill car information</Text>

            <TextInput  onChangeText={(text) => handleChange("carModel", text)}  outlineColor='lightgrey' activeOutlineColor='#1F87FE'  mode='outlined' label={"Car Model"}  style={styles.input} />
            <TextInput onChangeText={(text) => handleChange("manufactureYear", text)}  outlineColor='lightgrey' activeOutlineColor='#1F87FE'  mode='outlined' label={"Manufacture year"}  style={styles.input} />
            <TextInput onChangeText={(text) => handleChange("licensePlateNumber", text)}  outlineColor='lightgrey' activeOutlineColor='#1F87FE'  mode='outlined' label={"License Plate Number"}  style={styles.input} />
            {/* Button to take photo */}
            <TouchableOpacity onPress={captureImage} style={styles.button}>
                <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>

            {/* Button to select image from gallery */}
            <TouchableOpacity onPress={selectImageFromGallery} style={styles.button}>
                <Text style={styles.text}>Choose from Gallery</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.imageContainer}>
                {images.map((uri, index) => (
                    <View key={index} style={styles.imageWrapper}>
                        <Image source={{ uri }} style={styles.image} />
                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={() => uploadImage(uri)}
                        >
                            <Text style={styles.uploadText}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
              <Button
                onPress={()=>setcurrentForm(0)}
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
    progress:{
        margin:10,
        width:327,
        height:8,
      },
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 10,
    },
    title:{
        fontSize:25,
        fontWeight:"bold",
    
      },
      smallText:{
        color:"grey",
        textAlign:"right"
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
    uploadButton: {
        backgroundColor: "#28A745",
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
    },
    uploadText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        backgroundColor:"#fff",
        padding: 10,
        marginBottom: 20,
        marginTop:20,
        width: '80%',
      },
});
