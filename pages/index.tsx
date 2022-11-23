import { Box, Grid } from '@mui/material';
import AnimatedBot from '../components/animatedBot';
import ChatBot from '../components/bot';

export default function Home() {
   return (
      <Box sx={{ background: 'linear-gradient(-45deg, #00bcd4, #80deea, #ef9a9a, #FF845E);' }}>
         <Grid container sx={{ height: '100vh' }}>
            <Grid
               item
               md={6}
               sx={{
                  display: {
                     xs: 'none',
                     md: 'flex',
                  },
               }}
            >
               <Box
                  sx={{
                     width: '100%',
                     '& svg': { zIndex: 2000, width: '100%', height: '100%' },
                  }}
               >
                  <AnimatedBot />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChatBot />
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
}
