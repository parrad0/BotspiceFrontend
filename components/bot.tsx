/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
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
import HeaderBot from './headerBot';

function ChatBot() {
   const [init, result] = useLazyInitBotQuery();
   const [sendMessage] = useLazySendMessageQuery();
   const [userInput, setUserInput] = useState('');
   const [messages, setMessages] = useState<Message[] | undefined>([]);
   const bottomRef = useRef<any>(null);
   const dispatch = useDispatch();
   const session = useAppSelector((state) => state.app.session);

   const _parseCardResponse = (cards: any) => {
      console.log(
         `string before parse: ${cards
            .replaceAll(`image=`, `"image":"`)
            .replaceAll(`label=`, `"label":"`)
            .replaceAll(`url=`, `"url":"`)
            .replaceAll(`,"`, `","`)
            .replaceAll(`, "`, `","`)
            .replaceAll(`},`, `"},`)
            .replaceAll(`}]`, `"}]`)}`
      );

      return JSON.parse(
         cards
            .replaceAll(`image=`, `"image":"`)
            .replaceAll(`label=`, `"label":"`)
            .replaceAll(`url=`, `"url":"`)
            .replaceAll(`,"`, `","`)
            .replaceAll(`, "`, `","`)
            .replaceAll(`},`, `"},`)
            .replaceAll(`}]`, `"}]`)
      );
   };
   const _deleteCharacter = () => {
      setUserInput((prev) => prev.substring(0, prev.length - 1));
   };

   const sendUserMessage = (input: string) => {
      if (input.length === 0) return;
      pushMessage(input, true, input, undefined);
      sendMessage({
         session,
         body: {
            text: input,
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
      switch (String.fromCharCode(e.keyCode)) {
         case '\b': {
            _deleteCharacter();
            break;
         }
         case '\r': {
            sendUserMessage(userInput);
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
      init(1).then((res: any) => {
         dispatch(setSession(res.data.sessionCode));
         setMessages((prev: any) => [
            ...prev,
            {
               text: res.data.answers[0].content,
               type: false,
               key: res.data.answers[0].interactionId,
               buttons: res.data.answers[0].buttons,
            },
         ]);
      });
   }, []);

   return (
      <Box
         sx={{
            borderRadius: { xs: '0px', md: '8px' },
            maxWidth: { xs: '100%', md: '800px' },
            maxHeight: { xs: '100%', md: '900px' },
            minHeight: { md: '700px' },
            // minHeight: '900px',
            // minWidth: '900px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
         }}
      >
         <HeaderBot />
         <Box
            sx={{
               '&::-webkit-scrollbar': { display: 'none' },
               height: '100%',
               flexGrow: 1,
               overflowY: 'scroll',
               p: '1rem',
               boxSizing: 'content-box',
            }}
         >
            {result.isLoading && <CircularProgress />}
            {messages?.map((mes) => {
               if (mes?.typeMessage === 'card') {
                  return _parseCardResponse(mes.text).map((card: any) => (
                     <CardFC url={card.url} label={card.label} image={card.image} />
                  ));
               }
               return (
                  <MessageFC
                     text={mes.text}
                     keyTag={mes.key}
                     type={mes.type}
                     buttons={mes.buttons}
                     action={sendUserMessage}
                  />
               );
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
               backgroundColor: (theme) => theme.palette.info.main,
               borderRadius: { xs: '0px', md: '0px 0px 8px 8px' },
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

            <IconButton aria-label="upload picture" component="label" onClick={() => sendUserMessage(userInput)}>
               <SendIcon fontSize="large" sx={{ color: (theme) => theme.palette.info.dark }} />
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
   width: '100%',
});
