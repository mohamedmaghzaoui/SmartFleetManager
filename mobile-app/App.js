import React from "react";
import { MainContainer } from "./MainContainer";
import { PaperProvider } from "react-native-paper";
import { CarProvider } from "./CarContext";

export default function App() {
  return (
    <PaperProvider>
      <CarProvider>
        <MainContainer />
      </CarProvider>
    </PaperProvider>
  );
}
