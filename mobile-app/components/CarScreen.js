import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { CarContext } from '../CarContext';
import { FontAwesome5 } from '@expo/vector-icons';

export const CarScreen = () => {
  
  const { car, loading } = React.useContext(CarContext);
// check if car data exist
  if (!car) {
    return (
      <View>
        <Text>no data</Text>
      </View>
    );
  }

  // render detail only if valid data provided
  const renderDetail = (label, value, unit = "") => {
    if (value === "Not provided") return null;
    return (
      <Text style={styles.detailText}>
        {label}: <Text style={styles.highlight}>{value}{unit}</Text>
      </Text>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      {/* Car Info Card */}
      <View style={styles.largeCard}>
        <FontAwesome5 name="car" size={70} color="#1F87FE" style={styles.carIcon} />
        <Text style={styles.carModel}>{car.carModel}</Text>
        <Text style={styles.licensePlate}>{car.licensePlateNumber}</Text>

        <View style={styles.horizontalLine} />

        <Text style={styles.detailTitle}>Vehicle Details</Text>

        <View style={styles.detailsContainer}>
          {renderDetail("Manufacture Year", car.manufactureYear)}
          {renderDetail("Speed", car.speed, " km/h")}
          {renderDetail("Total Distance", car.distance, " km")}
          {renderDetail("Fuel Consumption", car.fuel_consumption, " L/100km")}
          {renderDetail("Emissions", car.emissions, " g/km")}
          {renderDetail("Battery Voltage", car.battery_voltage, " V")}
          {renderDetail("Engine Temperature", car.engine_temperature, "°C")}
          {renderDetail("Fuel Level", car.fuel_level, " %")}
          {renderDetail("Oil Pressure", car.oil_pressure, " psi")}
        </View>

        <View style={styles.horizontalLine} />

        <Text style={styles.detailTitle}>Maintenance</Text>
        <Text style={styles.detailText}>Next Maintenance: <Text style={styles.highlight}>{car.next_maintenance}</Text></Text>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F0F3FA',
    flexGrow: 1,
    padding: 20,
  },
  largeCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  carIcon: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  carModel: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3142',
    marginVertical: 5,
  },
  licensePlate: {
    color: '#1F87FE',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E9EEF8',
    marginVertical: 15,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3142',
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#1F87FE',
  },
});
