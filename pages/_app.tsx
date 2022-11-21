import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { Provider as Redux } from 'react-redux';
import { store } from '../redux/store/store';
import GlobalStyles from '../styles/globals';
import { theme } from '../styles/themeConfig';

export default function App({ Component, pageProps }: AppProps) {
   return (
      <Redux store={store}>
         <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Component {...pageProps} />
         </ThemeProvider>
      </Redux>
   );
}
