/* eslint-disable import/prefer-default-export */
import { createTheme, responsiveFontSizes } from '@mui/material';

const them = createTheme({
   palette: {
      primary: { main: '#d9fdd3' },
      secondary: {
         main: '#FFFFFF',
      },
      info: {
         main: '#f0f2f5',
      },
   },
   typography: {
      fontFamily: ["'Arial'"].join(','),
      body1: { fontSize: '1.5rem' },
      body2: { fontSize: '1.3rem' },
   },
});
export const theme = responsiveFontSizes(them);
