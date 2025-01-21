import React, { useState } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {TextInput} from "react-native-paper";
import { ProgressBar as PaperProgressBar } from 'react-native-paper';
export const UserForm=({setcurrentForm})=>{
    return(
    <View style={styles.container}>
        <PaperProgressBar progress={0.5} color="#1F87FE" style={styles.progress} />
        
            <Text style={styles.title}>Personalise your experience</Text>
            <Text style={styles.smallText}>Please Fill personal information</Text>
              <TextInput   outlineColor='lightgrey' activeOutlineColor='#1F87FE'  mode='outlined' label={"Firstname"}  style={styles.input} />
              <TextInput  outlineColor='lightgrey' activeOutlineColor='#1F87FE'  mode='outlined' label={"Lastname"}  style={styles.input} />
              <TextInput keyboardType='numeric'  outlineColor='lightgrey' activeOutlineColor='#1F87FE'  mode='outlined' label={"mobile"}  style={styles.input} />
              <TextInput  keyboardType="email-address"  outlineColor='lightgrey' activeOutlineColor='#1F87FE'  mode='outlined' label={"email"}  style={styles.input} />
              <View style={styles.buttonContainer}>
  <Button
    onPress={()=>setcurrentForm(1)}
    title="Next"
    color="#007BFF"
  />
</View>


    </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',  // Take full width of the parent
        alignItems: 'center',  // Center the content inside
    },
    buttonContainer: {
        width:100,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
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
    text: {
      color: '#fff',
      fontWeight: 'bold',
    },
    smallText:{
      color:"grey",
      textAlign:"right"
    },
  });