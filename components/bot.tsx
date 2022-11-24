/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-key */
import { Box, IconButton, TextField, styled } from '@mui/material';
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
import Spinner from './spinner';

function ChatBot({ happy, typing }: any) {
   const [init, result] = useLazyInitBotQuery();
   const [sendMessage, messageResponse] = useLazySendMessageQuery();
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
      happy(true);
      pushMessage(input, true, input, undefined);
      sendMessage({
         session,
         body: {
            text: input,
         },
      }).then((res: any) => {
         // const msg = res.data?.answers[0];
         res.data?.answers.map((answer: any) =>
            pushMessage(answer.content, false, answer.interactionId, answer.technicalText?.type || '', answer.buttons)
         );
         // console.log(`answer: ${JSON.stringify(msg)}`);
         // console.log(`data: ${JSON.stringify(msg?.technicalText?.data)}`);
         // pushMessage(msg.content, false, msg.interactionId, msg.technicalText?.type || '');
      });
   };

   const pushMessage = (message: any, type: any, key: string, typeMessage: any = '', buttons: any) => {
      // setMessages((prev: any) => [...prev, { text: message, type:, key, typeMessage }]);
      setMessages((prev: any) => [
         ...prev,
         {
            text: message,
            type,
            key,
            typeMessage,
            buttons,
         },
      ]);
      setUserInput('');
   };

   const handleKeyboard = (e: any) => {
      switch (String.fromCharCode(e.keyCode)) {
         case '\b': {
            _deleteCharacter();
            typing(false);
            break;
         }
         case '\r': {
            sendUserMessage(userInput);
            typing(false);
            break;
         }
         default: {
            setUserInput((prev) => prev.concat(String.fromCharCode(e.keyCode)).toLowerCase());
            typing(true);
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
            position: 'relative',
            borderRadius: { xs: '0px', md: '8px' },
            width: { xs: '100%', md: '70%', xl: '60%' },
            height: { xs: '100%', md: '80%' },
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
         }}
      >
         <HeaderBot />
         <Box
            sx={{
               '&::-webkit-scrollbar': { display: 'none' },
               flex: '1 1 400px',
               overflow: 'hidden',
               overflowY: 'scroll',
               p: '1rem',
               boxSizing: 'content-box',
               backgroundColor: '#D9D9D9',
            }}
         >
            <Box>
               {result.isLoading && <Spinner />}
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
         </Box>
         <Box
            sx={{
               flex: '.1 .1 auto',
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

            <IconButton
               disabled={messageResponse.isLoading || result.isLoading}
               aria-label="upload picture"
               component="label"
               onClick={() => sendUserMessage(userInput)}
            >
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
