import { useReducer } from 'react';
import { QuoteType } from './../App';
import { useCallback } from 'react';

interface HTTPState {
   data: any,
   error: null | string,
   status: null | 'pending' | 'completed'
}

type HTTPActionTypes =
| {type: 'SEND'}
| {type: 'ERROR', payload: string}
| {type: 'SUCCESS', payload: QuoteType[]}

const httpReducer = (state: HTTPState, action: HTTPActionTypes): HTTPState => {
   switch (action.type) {
      case 'SEND': return {
         data: null,
         error: null,
         status: 'pending'
      };
      case 'SUCCESS': return {
         data: action.payload,
         error: null,
         status: 'completed'
      };
      case 'ERROR': return {
         data: null,
         error: action.payload,
         status: 'completed'
      };
      default: return state;
   }
}

const useHTTP = (requestFn: any) => {
   const [httpState, dispatch] = useReducer(httpReducer, {
      data: null,
      error: null,
      status: null
   });

   type RequestData = 
   | null 
   | string
   | {text: string, quoteId: string | undefined}
   | {author: string, text: string};

   const sendRequest = useCallback(
      async (requestData?: RequestData) => {
         dispatch({type: 'SEND'});
         try {
            const responseData = await requestFn(requestData);
            dispatch({type: 'SUCCESS', payload: responseData});
         } catch(error) {
            dispatch({type: 'ERROR', payload: (error as Error).message || 'Something went wrong...'})
         }

      }, [requestFn]
   );

   return {
      sendRequest,
      ...httpState
   }
}

export default useHTTP;