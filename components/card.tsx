/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { Box } from '@mui/material';

function CardFC({ image, url, label }: any) {
   return (
      <Box
         sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
            padding: '1rem',
            width: '40%',
            marginRight: 'auto',
            mb: '1rem',
            borderRadius: '5px',
         }}
      >
         <p>{label}</p>
      </Box>
   );
}

export default CardFC;
