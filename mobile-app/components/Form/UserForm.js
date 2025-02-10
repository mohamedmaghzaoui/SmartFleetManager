import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { ProgressBar as PaperProgressBar } from "react-native-paper";

export const UserForm = ({ setcurrentForm, handleChange, formData }) => {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      setError("Please fill all the fields before continuing.");
    } else {
      setError(""); // Clear error if everything is filled
      setcurrentForm(1);
    }
  };

  return (
    <View style={styles.container}>
      <PaperProgressBar progress={0.5} color="#1F87FE" style={styles.progress} />

      <Text style={styles.title}>Personalise your experience</Text>
      <Text style={styles.smallText}>Please Fill personal information</Text>

      <TextInput
        onChangeText={(text) => handleChange("firstName", text)}
        outlineColor="lightgrey"
        activeOutlineColor="#1F87FE"
        mode="outlined"
        label={"Firstname"}
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => handleChange("lastName", text)}
        outlineColor="lightgrey"
        activeOutlineColor="#1F87FE"
        mode="outlined"
        label={"Lastname"}
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => handleChange("phone", text)}
        keyboardType="numeric"
        outlineColor="lightgrey"
        activeOutlineColor="#1F87FE"
        mode="outlined"
        label={"Phone"}
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
        outlineColor="lightgrey"
        activeOutlineColor="#1F87FE"
        mode="outlined"
        label={"Email"}
        style={styles.input}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button onPress={handleNext} title="Next" color="#007BFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    width: 100,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  progress: {
    margin: 20,
    width: 327,
    height: 8,
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    width: "80%",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  smallText: {
    color: "grey",
    textAlign: "right",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default UserForm;
