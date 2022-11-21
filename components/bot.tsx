/* eslint-disable react/jsx-key */
import { Box, Button, CircularProgress, styled, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../redux/hooks/hook';
import { setSession } from '../redux/reducer/app';
import { useLazyInitBotQuery, useLazySendMessageQuery } from '../redux/reducer/botApi';
import { Message } from '../types/message';
import MessageFC from './message';

const ChatBot = () => {
   const [init, result] = useLazyInitBotQuery();
   const [sendMessage] = useLazySendMessageQuery();
   const didMountRef = useRef(false);
   const [userInput, setUserInput] = useState('');
   const [messages, setMessages] = useState<Message[] | undefined>([]);
   const bottomRef = useRef<any>(null);
   const dispatch = useDispatch();
   const session = useAppSelector((state) => state.app.session);

   const _deleteCharacter = () => {
      setUserInput((prev) => prev.substring(0, prev.length - 1));
   };

   const sendUserMessage = () => {
      pushMessage(userInput, true, userInput);
      sendMessage({
         session: session,
         body: {
            text: userInput,
         },
      }).then((res: any) => {
         pushMessage(res.data?.answers[0].content, false, res.data?.answers[0].interactionId);
      });
   };

   const pushMessage = (message: any, type: any, key: string) => {
      setMessages((prev: any) => [...prev, { text: message, type: type, key: key }]);
      setUserInput('');
   };

   const handleKeyboard = (e: any) => {
      console.log(`key: ${JSON.stringify(String.fromCharCode(e.keyCode))}`);
      switch (String.fromCharCode(e.keyCode)) {
         case '\b': {
            _deleteCharacter();
            break;
         }
         case '\r': {
            sendUserMessage();
            break;
         }
         default: {
            setUserInput((prev) => prev.concat(String.fromCharCode(e.keyCode)).toLowerCase());
            break;
         }
      }
   };

   useEffect(() => {
      bottomRef.current?.scrollIntoView(false);
   }, [messages]);

   useEffect(() => {
      if (didMountRef.current) {
         init(1).then((res: any) => {
            dispatch(setSession(res.data.sessionCode));
            setMessages((prev: any) => [
               ...prev,
               { text: res.data.answers[0].content, type: false, key: res.data.answers[0].interactionId },
            ]);
         });
      }
      didMountRef.current = true;
   }, []);

   return (
      <Box
         sx={{
            borderRadius: '8px',
            width: '100%',
            height: '100%',
            backgroundColor: 'grey',
            display: 'flex',
            flexDirection: 'column',
         }}
      >
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '3rem' }}>BotSpice</Box>
         <Box sx={{ height: '100%', overflow: 'scroll', p: '1rem', boxSizing: 'border-box' }}>
            {result.isLoading && <CircularProgress />}
            {messages?.map((mes) => {
               console.log(`loggnig`);
               return <MessageFC text={mes.text} keyTag={mes.key} type={mes.type} />;
            })}
            <div ref={bottomRef} />
         </Box>
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between',
               p: '0.3rem 0.8rem',
               backgroundColor: 'black',
               borderRadius: '0px 0px 8px 8px',
            }}
         >
            <MyComponent
               focused
               value={userInput}
               id="outlined-basic"
               multiline
               maxRows={4}
               color="info"
               onKeyDown={(a) => handleKeyboard(a)}
            />
            <Button onClick={() => sendUserMessage()}>Send</Button>
         </Box>
      </Box>
   );
};
export default ChatBot;

const MyComponent = styled(TextField)({
   backgroundColor: 'white',
   borderRadius: '10px',
   borderColor: 'grey !important',
});
