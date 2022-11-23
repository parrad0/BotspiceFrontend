/* eslint-disable react/no-danger */
import { Button, Paper } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from 'react';

function MessageFC({ text, keyTag, type, buttons, action }: any) {
   const [status, setStatus] = useState(false);
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
         {buttons && (
            <ButtonGroup
               disabled={status}
               variant="contained"
               aria-label="outlined primary button group"
               sx={{ mt: '10px', backgroundColor: (theme) => theme.palette.info.main }}
            >
               {buttons?.map((_button: any) => {
                  return (
                     <Button
                        onClick={() => {
                           action(_button.value);
                           setStatus(true);
                        }}
                     >
                        {_button.name}
                     </Button>
                  );
               })}
            </ButtonGroup>
         )}
      </Paper>
   );
}
export default MessageFC;
