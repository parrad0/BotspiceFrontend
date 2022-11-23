import { Avatar, Box, Typography } from '@mui/material';

function HeaderBot() {
   return (
      <Box
         sx={{
            flex: '.1 .1 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '10px 16px',
            backgroundColor: '#F9F9FB',
            borderRadius: { xs: '0px', md: '8px 8px 0px 0px' },
         }}
      >
         <Avatar
            alt="Remy Sharp"
            src="https://w7.pngwing.com/pngs/1001/63/png-transparent-internet-bot-computer-icons-chatbot-sticker-electronics-face-careobot.png"
            sx={{ width: 60, height: 60 }}
         />
         <Typography variant="body2" sx={{ ml: '15px', color: 'black' }}>
            BotSpice
         </Typography>
      </Box>
   );
}
export default HeaderBot;
