import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import AnimatedBot from '../components/animatedBot';
import ChatBot from '../components/bot';
import ShareModal from '../components/shareModal';
import { useAppSelector } from '../redux/hooks/hook';

export default function Home() {
   const [happy, setHappy] = useState(false);
   const [typing, setTyping] = useState(false);
   const shareModal = useAppSelector((state) => state.app.shareModal.status);
   const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
   };
   useEffect(() => {
      window.addEventListener('resize', appHeight);
      appHeight();
   }, []);
   return (
      <Box sx={{ background: 'linear-gradient(-45deg, #00bcd4, #80deea, #ef9a9a, #FF845E);' }}>
         <Grid container sx={{ height: 'var(--app-height)', overflow: 'hidden' }}>
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
         <ShareModal open={shareModal} />
      </Box>
   );
}
