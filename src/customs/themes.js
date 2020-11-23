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
    primaryEscuro: '#ffbf00',
    seguindo: '#2962ff',
    online: '#32CD32',
    accent: '#ffffff',
    h2: '#b5b5b5' ,
    cinzaClaro: '#cfcfcf',
    cinzaEscuro: '#595959',
    cinzaMedio: '#919191',
    preto: '#000000',
    background: '#ffffff',
    surface:'#ffffff',
    error: '#B00020',
    text: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    TextInputOutlined: '#000000'
  },
};

export default theme;