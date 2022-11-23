import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkIcon from '@mui/icons-material/Link';
import StyledModal from './styledModal';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hook';
import StyledButton from './styledButton';
import { setShareModal } from '../redux/reducer/app';

function ShareModal({ open }: { open: boolean }) {
   const dispatch = useAppDispatch();
   const url = useAppSelector((state) => state.app.shareModal.url);

   return (
      <StyledModal open={open} onClose={() => dispatch(setShareModal({ status: false }))}>
         <Box
            width="350px"
            alignItems="center"
            sx={{
               border: '0px',
               borderRadius: '30px',
               backgroundColor: 'white',
               p: '3rem',
               height: { xs: '350px', md: '400px' },
            }}
         >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', zIndex: '9999' }}>
               <Typography variant="h4">Share with:</Typography>
               <IconButton onClick={() => dispatch(setShareModal({ status: false }))}>
                  <CloseIcon />
               </IconButton>
            </Box>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '80%',
                  m: 'auto',
                  mt: '5rem',
               }}
            >
               <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                     borderRadius: '50%',
                     backgroundColor: '#25D366',
                     height: { md: '80px', xs: '50px' },
                     width: { xs: '50px', md: '80px' },
                  }}
               >
                  <IconButton onClick={() => window.open(`whatsapp://send?text=${url}`, `_blank`)}>
                     <WhatsAppIcon fontSize="large" sx={{ color: 'white' }} />
                  </IconButton>
               </Box>
               <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                     borderRadius: '50%',
                     backgroundColor: '#00acee',
                     height: { md: '80px', xs: '50px' },
                     width: { xs: '50px', md: '80px' },
                  }}
               >
                  <IconButton
                     onClick={() =>
                        window.open(`http://twitter.com/share?text=Look this awesome recipe${url}`, `_blank`)
                     }
                  >
                     <TwitterIcon fontSize="large" sx={{ color: 'white' }} />
                  </IconButton>
               </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '6rem' }}>
               <StyledButton
                  size="medium"
                  variant="outlined"
                  startIcon={<LinkIcon />}
                  onClick={() => navigator.clipboard.writeText(url)}
               >
                  copy link
               </StyledButton>
            </Box>
         </Box>
      </StyledModal>
   );
}
export default ShareModal;
