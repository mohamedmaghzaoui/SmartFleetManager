import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { UserForm } from './Form/UserForm';
import { CarForm } from './Form/CarForm';


export const CameraScreen = () => {
  const [currentForm, setcurrentForm] = useState(0)
  const setForm=(form)=>{
    setcurrentForm(form)
  }
  

  return (
    <ScrollView style={styles.container}>
     {currentForm==0 ?<UserForm setcurrentForm={setcurrentForm} /> : <CarForm setcurrentForm={setcurrentForm} /> }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F0F3FA',
  },
});
