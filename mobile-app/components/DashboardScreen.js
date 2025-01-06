import React from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';


// DashboardScreen Component
export const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      {/* first container */}
      <View style={styles.horizontalContainer}>
      <View style={styles.smallCard}>
        <Text style={styles.title}>Vitesse</Text>
        <Text style={styles.speed}>20 km/h</Text>
        <Text style={styles.date}>06/01/2025</Text>
      </View>
      <View style={styles.smallCard}>
        <Text style={styles.title}>Carburant</Text>
        <Text style={styles.speed}>20</Text>
        <Text style={styles.date}>06/01/2025</Text>
      </View>
      </View>
            {/* second container */}
      <View style={styles.largeCard}>
        <Text style={styles.carTitle}>BMW</Text>
        <Text style={styles.carModel}>3008</Text>
        <View style={styles.horizontalLine} />

        <View style={styles.horizontalContainer}>
        <Text style={styles.carYear}>2015</Text>
        <Text style={styles.carEngine}>2.0L Turbo</Text>
        </View>
      </View>
       {/* third container */}
      <View style={styles.largeCard}>
      <Text style={styles.title}>Position</Text>
        <Image style={styles.image}   source={{
            uri: 'https://www.leparisien.fr/resizer/efCs6S_-rGdBhi2P0NQeijAEUws=/932x582/arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/5UAWECLJVFOXQS6RPEGA3XXU3M.jpg',
          }}/>

      </View>
       {/* third container */}
      <View style={styles.horizontalContainer}>
      <View style={styles.smallCard}>
        <Text style={styles.title}>Vitesse</Text>
        <Text style={styles.speed}>20 km/h</Text>
        <Text style={styles.date}>06/01/2025</Text>
      </View>
       {/* third container */}
      <View style={styles.smallCard}>
        <Text style={styles.title}>Carburant</Text>
        <Text style={styles.speed}>20</Text>
        <Text style={styles.date}>06/01/2025</Text>
      </View>
      </View>    
    </View>
  );
};
const styles=StyleSheet.create({
  image:{
    width:"100%",
    height:"100%"

  },
  mainContainer:{
    backgroundColor:"#F0F3FA", 
    flex: 1,
  },
  horizontalContainer:{
    flexDirection:"row",
    justifyContent:"space-around"
   
  },
  smallCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 20,
    width: '40%',
    height:"75%",                  
    padding: 20,       
     // iOS shadow properties
  shadowColor: "#000",           
  shadowOffset: { width: 0, height: 4 },  
  shadowOpacity: 0.1,            
  shadowRadius: 8,               
  
  // Android shadow property
  elevation: 5,                      
  },
  largeCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 20,
    width: '90%',
    height:'20%',                  
    padding: 25,      
     // iOS shadow properties
  shadowColor: "#000",           
  shadowOffset: { width: 0, height: 4 },  
  shadowOpacity: 0.1,            
  shadowRadius: 8,               
  
  // Android shadow property
  elevation: 5,                            
  },
  
  speed:{
    fontFamily:"Rubik",
    color:"#1F87FE",
    fontWeight:"bold"
  },
  title:{
    color:"#2D3142",
    fontWeight:"600"
  },
  carTitle:{
    textAlign:"center",
    fontSize:18,
    fontWeight:"bold",
    color:"#2D3142",
  },
  carModel: {
    color: "#1F87FE", // Keep only one color
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  
  carYear:{
    fontWeight:600,
    textAlign:"left"
  },
  carEngine:{
    fontWeight:600,
    textAlign:"center"

  },
  date:{
    marginTop:10,
    color:"#2D3142",
    fontWeight:"400",
    textDecorationLine:"underline"
  },
  horizontalLine: {
    borderBottomWidth: 1,
    width:"100%",
    
    borderBottomColor: '#E9EEF8',  // Color of the line
    marginVertical: 10,          // Optional: Adds space above and below the line
  }
  
})