import React from 'react';

import { MainContainer } from './MainContainer';
import {PaperProvider} from "react-native-paper"



export default function App() {
  return (
    <PaperProvider>
    <MainContainer />
  </PaperProvider>
  );
}
