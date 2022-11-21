import { Box } from '@mui/material';

function MessageFC({ text, keyTag, type }: any) {
   return (
      <Box
         sx={{
            backgroundColor: (theme) => (type ? theme.palette.primary.main : theme.palette.secondary.main),
            padding: '1rem',
            width: '40%',
            marginRight: () => (type ? '0px' : 'auto'),
            marginLeft: () => (type ? 'auto' : '0px'),
            mb: '1rem',
            borderRadius: '5px',
         }}
      >
         <span key={keyTag} dangerouslySetInnerHTML={{ __html: text }} />
      </Box>
   );
}
export default MessageFC;
