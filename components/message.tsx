import { Paper } from '@mui/material';

function MessageFC({ text, keyTag, type }: any) {
   return (
      <Paper
         elevation={3}
         sx={{
            backgroundColor: (theme) => (!type ? theme.palette.common.white : theme.palette.primary.light),
            padding: '1rem',
            width: 'fit-content',
            minWidth: '40px',
            maxWidth: '80%',
            marginRight: () => (type ? '0px' : 'auto'),
            marginLeft: () => (type ? 'auto' : '0px'),
            mb: '12px',
            borderRadius: '15px',
         }}
      >
         <span key={keyTag} dangerouslySetInnerHTML={{ __html: text }} />
      </Paper>
   );
}
export default MessageFC;
