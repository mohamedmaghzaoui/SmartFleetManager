import React, { useState, useEffect } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; // Import Expo Location API

// MapScreen Component
export const MapScreen = () => {
  const [location, setLocation] = useState(null); // State to store user's location
  const [errorMsg, setErrorMsg] = useState(null); // State to store error message
  //start regison
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Function to get the current location
  const getLocation = async () => {
    // Request location permissions
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      Alert.alert('Permission Denied', 'Permission to access location was denied');
      return;
    }

    // Get the current location
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    // Show the location in an alert (optional)
    Alert.alert(
      'Your Location',
      `Latitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`
    );

    // Update the region for the map to center on the current location
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  useEffect(() => {
    // Continuously watch the user's location
    const watchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      // Watch for location updates
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every 1 second
          distanceInterval: 1, // Update if location changes by 1 meter
        },
        (newLocation) => {
          setLocation(newLocation);
          setRegion({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      );

      return () => {
        subscription.remove();
      };
    };

    watchLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region} // Dynamically set region to follow location
        showsUserLocation={true} // Show the user's current location on the map
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            description="This is where you are!"
          />
        )}
      </MapView>

      {/* <Button title="Get Location" onPress={getLocation} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centering the content
    alignItems: 'center',
    padding: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
