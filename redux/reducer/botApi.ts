// Need to use the React-specific entry point to import createApi
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { setToken } from './app';


const dynamicBaseQuery : BaseQueryFn<
String | FetchArgs,
any,
FetchBaseQueryError> = async (args : any, api, extraOptions)=>{
const apiKey = "a8bbb747-ebe6-11ec-8e01-4201ac1e0009";
const orgUUID ="48249918-6f7e-4370-9a46-b2dc572db1a3";
const envUUID = "fcbf84f6-2573-4a33-820f-b34a75fde7bf";
const botUUID = "0be5cfd7-3710-400a-838c-169143d57bdd";
const channelUUID = 'Web';

  const raw = fetchBaseQuery({ baseUrl:`https://api-americas-instance1.eva.bot/eva-broker/org/${orgUUID}/env/${envUUID}/bot/${botUUID}/conversations`,
    prepareHeaders: async (headers, { getState }) => {
    const token = (getState() as RootState).app.token
    
    if(!token){
    const at = await fetch('https://keycloak-americas-admin.eva.bot/auth/realms/NTTDATA-EMEAL/protocol/openid-connect/token',
        {method:'post', 
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'grant_type': 'client_credentials',
          'client_id':'showrooms',
          'client_secret':'Iu0vvBVw4P0aaB3tAZiOtn0rxDODaaVc'
      })
    })
    .then(el => el.json())
    .then(res => {api.dispatch(setToken(res.access_token)); return res;})
    .catch(ex => console.log(`ERR: ${JSON.stringify(ex)}`));

    headers.set('authorization', `Bearer ${at.access_token}`)

    }
    else{
      headers.set('authorization', `Bearer ${token}`)
    }
    headers.set('Content-Type', 'application/json');
    headers.set('API-KEY', apiKey);
    headers.set('USER-REF', '129.1.2.3');
    headers.set('CHANNEL', channelUUID);
    headers.set('OS', 'windows');
    headers.set('LOCALE', 'en-Us');

    return headers
  } });

  return raw( args,api, extraOptions);
}
// Define a service using a base URL and expected endpoints
export const botApi = createApi({
   reducerPath: 'flatshares',
   baseQuery: dynamicBaseQuery,
   endpoints: (builder) => ({
      InitBot: builder.query<any,any>({
        query: () => {
            return {
               url: '',
               method:'POST',
               body: JSON.stringify({
                "code":"%EVA_WELCOME_MSG",
                "context":{}
              }
              )
            };
         },
      }),
      SendMessage: builder.query<any,any>({
        query: ({session,body}) => {
            return {
               url: `/${session}`,
               method:'POST',
               body: JSON.stringify(body)
            };
         },
      }),
   }),
});
export const { useLazyInitBotQuery, useLazySendMessageQuery } = botApi;
