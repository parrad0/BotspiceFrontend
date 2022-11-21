/* eslint-disable unused-imports/no-unused-vars */
import { Box, Paper } from '@mui/material';

function CardFC({ image, url, label }: any) {
   return (
      <Paper elevation={3}
         sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
            padding: '1rem',
            maxWidth: '80%',
            marginRight: 'auto',
            mb: '1rem',
            borderRadius: '40px',
         }}
      >
         <p>{label}</p>
      </Paper>
   );
}

export default CardFC;
