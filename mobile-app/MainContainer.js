import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";


import { DashboardScreen } from "./components/DashboardScreen";
import { MapScreen } from "./components/MapScreen";

import {NotificationScreen} from "./components/NotificationScreen"
import { CameraScreen } from "./components/CameraScreen";
import { CarScreen } from "./components/CarScreen";




// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

export const MainContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          // Add icons based on route name
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Dashboard") {
              iconName = focused ? "home" : "home-outline"; // Home icon

            } else if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline"; // Map icon

            } else if (route.name === "Camera") {
              iconName = focused ? "camera" : "camera-outline"; // Camera icon

            } else if (route.name === "Notification") {
              iconName = focused ? "notifications" : "notifications-outline"; // Notification icon
            } else if (route.name === "Car") {
              iconName = focused ? "car" : "car-outline"; // Notification icon
            }

            // Return the Ionicons component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue", // Active tab color
          tabBarInactiveTintColor: "gray", // Inactive tab color
        })}
      >
        {/* Add screens */}
        <Tab.Screen name="Car" component={CarScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Notification" component={NotificationScreen} />
   
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};
