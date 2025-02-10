import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CarContext } from "../CarContext";
export const ProfileScreen=()=>{
  const {car}=useContext(CarContext)
    const InfoRow = ({ icon, text }) => (
        <View style={styles.infoRow}>
          <Ionicons name={icon} size={20} color="blue" />
          <Text style={styles.infoText}>{text}</Text>
        </View>
      );
      if(!car){
        return <View>
          <Text>no data</Text>
        </View>
      }
    return (
        <View style={styles.container}>
          {/* Profil */}
          <View style={styles.profileCard}>
            <Image
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzwyqpjAmQf9cJZJYedogG6ivGM_FAyiIOwQ&s" }} 
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{car.firstName} {car.lastName}</Text>
              <Text style={styles.profileJob}>Driver</Text>
            </View>
        
          </View>
    
          {/* Infos */}
          <View style={styles.infoCard}>
            <InfoRow icon="call-outline" text={car.phone} />
            <InfoRow icon="mail-outline" text={car.email} />
            <InfoRow icon="car-outline" text={car.carModel} />
          
            <InfoRow icon="barcode-outline" text={car.licensePlateNumber} />
          </View>
        </View>
      );  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F9FA",
      padding: 20,
    },
    profileCard: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      elevation: 3,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    profileInfo: {
      flex: 1,
      marginLeft: 15,
    },
    profileName: {
      fontSize: 18,
      fontWeight: "bold",
    },
    profileJob: {
      color: "gray",
    },
    editButton: {
      backgroundColor: "blue",
      padding: 5,
      borderRadius: 5,
    },
    editButtonText: {
      color: "white",
    },
    infoCard: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 15,
      marginTop: 20,
      elevation: 3,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
    },
    infoText: {
      marginLeft: 10,
      fontSize: 16,
    },
  });