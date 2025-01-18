import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground ,TouchableOpacity} from 'react-native';

// DashboardScreen Component
export const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      {/* First Container */}
      <View style={styles.horizontalContainer}>
        <View style={styles.smallCard}>
          <Text style={styles.title}>Vitesse</Text>
          <Text style={styles.speed}>20 km/h</Text>
          <Text style={styles.date}>06/01/2025</Text>
        </View>
        <View style={styles.smallCard}>
          <Text style={styles.title}>Carburant</Text>
          <Text style={styles.speed}>20%</Text>
          <Text style={styles.date}>06/01/2025</Text>
        </View>
      </View>

      {/* Second Container */}
      <View style={styles.largeCard}>
        <Text style={styles.carTitle}>BMW</Text>
        <Text style={styles.carModel}>3008</Text>
        <View style={styles.horizontalLine} />
        <View style={styles.horizontalContainer}>
          <Text style={styles.carYear}>2015</Text>
          <Text style={styles.carEngine}>2.0L Turbo</Text>
        </View>
      </View>

      {/* Third Container with Background Image */}
      <ImageBackground
      style={styles.backgroundContainer}
      source={{
        uri: 'https://www.leparisien.fr/resizer/efCs6S_-rGdBhi2P0NQeijAEUws=/932x582/arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/5UAWECLJVFOXQS6RPEGA3XXU3M.jpg',
      }}
    >
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/709/709496.png',
            }}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  

      {/* Fourth Container */}
      <View style={styles.horizontalContainer}>
        <View style={styles.smallCard}>
          <Text style={styles.title}>Vitesse</Text>
          <Text style={styles.speed}>20 km/h</Text>
          <Text style={styles.date}>06/01/2025</Text>
        </View>
        <View style={styles.smallCard}>
          <Text style={styles.title}>Carburant</Text>
          <Text style={styles.speed}>20%</Text>
          <Text style={styles.date}>06/01/2025</Text>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F0F3FA',
    flex: 1,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  smallCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 20,
    width: '40%',
    height: '75%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  largeCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 20,
    width: '90%',
    height: '20%',
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  speed: {
    fontFamily: 'Rubik',
    color: '#1F87FE',
    fontWeight: 'bold',
  },
  title: {
    color: '#2D3142',
    fontWeight: '600',
  },
  carTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3142',
  },
  carModel: {
    color: '#1F87FE',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  carYear: {
    fontWeight: '600',
    textAlign: 'left',
  },
  carEngine: {
    fontWeight: '600',
    textAlign: 'center',
  },
  date: {
    marginTop: 10,
    color: '#2D3142',
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: '#E9EEF8',
    marginVertical: 10,
  },

  
  backgroundContainer: {
    height: 200,
    width: '90%',
    marginHorizontal: 30,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default DashboardScreen;
