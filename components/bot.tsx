/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-key */
import { Box, CircularProgress, IconButton, TextField, styled } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { useAppSelector } from '../redux/hooks/hook';
import { setSession } from '../redux/reducer/app';
import { useLazyInitBotQuery, useLazySendMessageQuery } from '../redux/reducer/botApi';
import { Message } from '../types/message';
import CardFC from './card';
import MessageFC from './message';

function ChatBot() {
   const [init, result] = useLazyInitBotQuery();
   const [sendMessage] = useLazySendMessageQuery();
   const didMountRef = useRef(false);
   const [userInput, setUserInput] = useState('');
   const [messages, setMessages] = useState<Message[] | undefined>([]);
   const bottomRef = useRef<any>(null);
   const dispatch = useDispatch();
   const session = useAppSelector((state) => state.app.session);

   const _parseCardResponse = (cards: any) => {
      return JSON.parse(
         cards.text
            .replaceAll(`image=`, `"image":"`)
            .replaceAll(`label=`, `"label":"`)
            .replaceAll(`url=`, `"url":"`)
            .replaceAll(`,`, `",`)
            .replaceAll(`}",`, `"},`)
            .replaceAll(`}]`, `"}]`)
      );
   };
   const _deleteCharacter = () => {
      setUserInput((prev) => prev.substring(0, prev.length - 1));
   };

   const sendUserMessage = () => {
      if (userInput.length === 0) return;
      pushMessage(userInput, true, userInput, undefined);
      sendMessage({
         session,
         body: {
            text: userInput,
         },
      }).then((res: any) => {
         const msg = res.data?.answers[0];
         console.log(`data: ${JSON.stringify(msg.technicalText?.data)}`);
         pushMessage(msg.content, false, msg.interactionId, msg.technicalText?.type || '');
      });
   };

   const pushMessage = (message: any, type: any, key: string, typeMessage: any = '') => {
      setMessages((prev: any) => [...prev, { text: message, type, key, typeMessage }]);
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
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
         }}
      >
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '3rem' }}>BotSpice</Box>
         <Box sx={{ height: '100%', overflowY: 'scroll', p: '1rem', boxSizing: 'border-box' }}>
            {result.isLoading && <CircularProgress />}
            {messages?.map((mes) => {
               if (mes?.typeMessage === 'card') {
                  return _parseCardResponse(mes.text).map((card: any) => (
                     <CardFC url={card.url} label={card.label} image={card.image} />
                  ));
               }
               return <MessageFC text={mes.text} keyTag={mes.key} type={mes.type} />;
            })}
            <div ref={bottomRef} />
         </Box>
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between',
               pt: '5px',
               pb: '5px',
               pr: '17px',
               pl: '17px',
               backgroundColor: '#CAF893',
               borderRadius: '0px 0px 8px 8px',
            }}
         >
            <MyComponent
               focused
               value={userInput}
               id="outlined-basic"
               multiline
               variant="standard"
               maxRows={4}
               color="info"
               onKeyDown={(a) => handleKeyboard(a)}
               InputProps={{
                  disableUnderline: true,
               }}
            />

            <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => sendUserMessage()}>
               <SendIcon />
            </IconButton>
         </Box>
      </Box>
   );
}
export default ChatBot;

const MyComponent = styled(TextField)({
   backgroundColor: 'white',
   borderRadius: '8px',
   padding: '8px 12px 11px',
   borderColor: 'grey !important',
});
