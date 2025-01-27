import * as React from "react";
import { Text, View } from "react-native";
import axios from "axios";


export const CarScreen = () => {
  const [carData, setCarData] = React.useState(null);
  const url = process.env.EXPO_PUBLIC_API_URL; // Flask backend URL

  React.useEffect(() => {
    // Fetch data from the Flask server
    axios
      .get(url)
      .then((response) => {
        setCarData(response.data); // Set the data to state
      })
      .catch((error) => {
        console.error("Error fetching :", error); // Handle errors
      });
  }, []); // Empty dependency array to run once when component mounts

  return (
    <View style={{ padding: 20 }}>
      <Text>Car Data:</Text>
      {carData ? (
        <Text>{JSON.stringify(carData)}</Text> // Display the fetched data
      ) : (
        <Text>Loading...</Text> // Show loading until data is fetched
      )}
    </View>
  );
};
