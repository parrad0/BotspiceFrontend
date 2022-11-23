import { Box, CircularProgress } from '@mui/material';

function Spinner() {
   return (
      <Box
         sx={{
            top: '0px',
            left: '0px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)',
            position: 'absolute',
            zIndex: 1000,
         }}
      >
         <CircularProgress />
      </Box>
   );
}
export default Spinner;
