import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import Sign from './Signs'
import {ThemeContext} from "styled-components";

export default function App() {

  const themeContext = useContext(ThemeContext);
  
  return (
      <Sign/> 
  );
}
