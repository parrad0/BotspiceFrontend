import { Box, Grid } from '@mui/material';
import AnimatedBot from '../components/animatedBot';
import ChatBot from '../components/bot';

export default function Home() {
   return (
      <Grid container sx={{ height: '100vh' }}>
         <Grid
            item
            md={6}
            sx={{
               display: {
                  xs: 'none',
                  md: 'flex',
                  background: 'linear-gradient(-45deg, #00bcd4, #80deea, #ef9a9a, #FF845E);',
                  height: '100%',
               },
            }}
         >
            <Box
               sx={{
                  height: '100%',
                  zIndex: '1500',
               }}
            >
               <AnimatedBot />
            </Box>
         </Grid>
         <Grid item xs={12} md={6}>
            <ChatBot />
         </Grid>
      </Grid>
   );
}
