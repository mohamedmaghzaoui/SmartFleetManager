import React from 'react';
import { View, Button } from 'react-native';

// DashboardScreen Component
export const DashboardScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Go to Map"
        onPress={() => navigation.navigate('Map')} // Use navigation prop here
      />
    </View>
  );
};
