import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store"; // ✅ Import SecureStore

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const url = process.env.EXPO_PUBLIC_API_URL + "/api/cars"; // ✅ Ensure proper URL formatting

  useEffect(() => {
    const fetchCar = async () => {
      try {
        console.log("Fetching car...");
        let storedDeviceId = await SecureStore.getItemAsync("deviceId");
  
        if (!storedDeviceId) {
          console.warn("No deviceId found in SecureStore.");
          return;
        }
  
        const response = await axios.get(`${url}?deviceId=${storedDeviceId}`);
        console.log("Car data fetched:", response.data);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };
  
    if (shouldRefetch) {
      console.log("Should refetch triggered");
      fetchCar();
      setShouldRefetch(false);  // Reset after fetching
    }
  }, [shouldRefetch]);  // Trigger fetch when shouldRefetch changes
  
  return (
    <CarContext.Provider value={{ car, setCar, loading,setShouldRefetch}}>
      {children}
    </CarContext.Provider>
  );
};
