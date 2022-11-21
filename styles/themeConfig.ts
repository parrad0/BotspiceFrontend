import { createTheme, responsiveFontSizes } from '@mui/material';
import { cyan } from '@mui/material/colors';

const them = createTheme({
   palette: {
      primary: cyan,
      secondary: {
         main: '#FF845E',
      },
      info: {
         main: '#808080',
      },
   },
   typography: {
      fontFamily: ["'Avenir'"].join(','),
      body1: { fontSize: '1.5rem' },
      body2: { fontSize: '1.3rem' },
   },
});
export const theme = responsiveFontSizes(them);
