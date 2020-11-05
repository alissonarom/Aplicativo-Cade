import React from "react";
import { configureFonts, DefaultTheme } from "react-native-paper";
import fontConfig from "./fonts";

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffd300',
    accent: '#ffffff',
    cinzaFont: '#f5f5f5' ,
    background: '#f6f6f6',
    surface:'#ffffff',
    error: '#B00020',
    text: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    TextInputOutlined: '#000000'
  },
};

export default theme;