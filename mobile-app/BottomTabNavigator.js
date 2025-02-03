import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Profil */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} 
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Richard Beck</Text>
          <Text style={styles.profileJob}>Heavy Vehicle Driving</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Infos */}
      <View style={styles.infoCard}>
        <InfoRow icon="call-outline" text="+91 99999 88888" />
        <InfoRow icon="mail-outline" text="richardbeck@gmail.com" />
        <InfoRow icon="location-outline" text="81 Washington Walk, New York" />
        <InfoRow icon="card-outline" text="460307201403200071" />
        <InfoRow icon="layers-outline" text="Hyper Atlantic Transport" />
      </View>
    </View>
  );
};

const InfoRow = ({ icon, text }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={20} color="blue" />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

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

export default ProfileScreen;
