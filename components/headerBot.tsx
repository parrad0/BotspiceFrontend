import { Avatar, Box, Typography } from '@mui/material';

function HeaderBot() {
   return (
      <Box
         sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '3rem',
            padding: '10px 16px',
            backgroundColor: (theme) => theme.palette.primary.dark,
            borderRadius: { xs: '0px', md: '8px 8px 0px 0px' },
         }}
      >
         <Avatar alt="Remy Sharp" sx={{ width: 30, height: 30 }} />
         <Typography sx={{ ml: '15px', color: 'black' }}>BotSpice</Typography>
      </Box>
   );
}
export default HeaderBot;
