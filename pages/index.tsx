import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import ChatBot from '../components/bot';

export default function Home() {
   return (
      <Box sx={{ height: '1000px', display: 'flex', alignItems: 'flex', justifyContent: 'center' }}>
         <Box sx={{ height: '600px', width: '400px' }}>
            <ChatBot />
         </Box>
      </Box>
   );
}
