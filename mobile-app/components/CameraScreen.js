import React, { useState } from 'react';
import {  Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

import {TextInput} from "react-native-paper";
import { ProgressBar as PaperProgressBar } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';

export const CameraScreen = () => {
  const [images, setImages] = useState([]); // Store multiple image URIs

  // Function to pick images
  const pickImages = async () => {
    if (images.length>3){
        alert("you can only pick 3 images")
        return
    }
    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    // Open image picker
    let result = await ImagePicker.launchImageLibraryAsync({
    selectionLimit:3,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Allow multiple images (iOS only)
      quality: 1,
    });

    // Handle the result
    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri); // Extract URIs from selected images
      setImages((prevImages) => [...prevImages, ...uris]); // Add new images to the list
    }
  };

  return (
    <View style={styles.container}>
     <PaperProgressBar progress={0.5} color="#1F87FE" style={styles.progress} />

    <Text style={styles.title}>Personalise your experience</Text>
    <Text style={styles.smallText}>Please Fill personal information</Text>
   


      <TextInput   outlineColor='lightgrey' activeOutlineColor='#1F87FE'  mode='outlined' label={"Firstname"}  style={styles.input} />
      <TextInput  outlineColor='lightgrey' activeOutlineColor='#1F87FE'  mode='outlined' label={"Lastname"}  style={styles.input} />
      <TextInput keyboardType='numeric'  outlineColor='lightgrey' activeOutlineColor='#1F87FE'  mode='outlined' label={"mobile"}  style={styles.input} />
      <TextInput  keyboardType="email-address"  outlineColor='lightgrey' activeOutlineColor='#1F87FE'  mode='outlined' label={"email"}  style={styles.input} />
      
      <TouchableOpacity onPress={pickImages} style={styles.button}>
        <Text style={styles.text}>Pick Images</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title:{
    fontSize:25,
    fontWeight:"bold",

  },
  progress:{
    margin:20,
    width:327,
    height:8,
  },
  input: {
    
    height: 40,
    backgroundColor:"#fff",
    padding: 10,
    marginBottom: 20,
    marginTop:20,
    width: '80%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  smallText:{
    color:"grey",
    textAlign:"right"

  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
});
