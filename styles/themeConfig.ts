/* eslint-disable import/prefer-default-export */
import { createTheme, responsiveFontSizes } from '@mui/material';
import { cyan } from '@mui/material/colors';

const them = createTheme({
   palette: {
      primary: cyan,
      secondary: {
         main: '#FFFFFF',
      },
      info: {
         main: '#BCF973',
      },
   },
   typography: {
      fontFamily: ["'Arial'"].join(','),
      body1: { fontSize: '1.5rem' },
      body2: { fontSize: '1.3rem' },
   },
});
export const theme = responsiveFontSizes(them);
