import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { UserForm } from './Form/UserForm';
import { CarForm } from './Form/CarForm';


export const CameraScreen = () => {
  const [formData,setFormData]=useState(({
    firstName:"",
    lastName:"",
    phone:"",
    email:"",
    carModel:"",
    manufactureYear:"",
    icensePlateNumber:"",
    image:[]
  }))

  
  const [currentForm, setcurrentForm] = useState(0)
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const setForm=(form)=>{
    setcurrentForm(form)
  }
  

  return (
    <ScrollView style={styles.container}>
     {currentForm==0 ?<UserForm formData={formData} handleChange={handleChange} setcurrentForm={setcurrentForm} /> : <CarForm handleChange={handleChange} formData={formData} setcurrentForm={setcurrentForm} /> }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F0F3FA',
  },
});
