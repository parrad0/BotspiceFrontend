import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import AnimatedBot from '../components/animatedBot';
import ChatBot from '../components/bot';

export default function Home() {
   const [happy, setHappy] = useState(false);
   const [typing, setTyping] = useState(false);

   return (
      <Box sx={{ background: 'linear-gradient(-45deg, #00bcd4, #80deea, #ef9a9a, #FF845E);' }}>
         <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
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
                     '& svg': { zIndex: 2000, width: '80%', height: '80%' },
                  }}
               >
                  <AnimatedBot happy={happy} typing={typing} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <ChatBot happy={setHappy} typing={setTyping} />
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
}
