import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store"; // ✅ Import SecureStore

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = process.env.EXPO_PUBLIC_API_URL + "/api/cars"; // ✅ Ensure proper URL formatting

  useEffect(() => {
    const fetchCar = async () => {
      try {
        let storedDeviceId = await SecureStore.getItemAsync("deviceId");

        if (!storedDeviceId) {
          console.warn("No deviceId found in SecureStore.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${url}?deviceId=${storedDeviceId}`);

        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, []);

  return (
    <CarContext.Provider value={{ car, setCar, loading }}>
      {children}
    </CarContext.Provider>
  );
};
