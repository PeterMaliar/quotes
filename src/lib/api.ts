import { QuoteType } from './../App';
const FIREBASE_DOMAIN = 'https://react-router-quotations-default-rtdb.firebaseio.com/';

export const getQuotes = async (): Promise<QuoteType[]> => {
   const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
   const data = await response.json();
   if (!response.ok) throw new Error(data.message || 'Could not fetch quotes...');
   const transformedData: QuoteType[] = [];

   for (const key in data) transformedData.push({id: key, ...data[key]});

   return transformedData
}

export const getQuote = async (key: string): Promise<QuoteType> => {
   
   const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${key}.json`);
   const data = await response.json();
   
   if (!response.ok) throw new Error(data.message || 'Could not fetch quote...');

   return data
}

export const addQuote = async (quoteData: any) => {
   
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
 
  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }
 
  return null;
}

export const addComment = async (requestData: {text: string, quoteId: string}) => {
  const {text, quoteId} = requestData;
   
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`, {
    method: 'POST',
    body: JSON.stringify({text}),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
 
  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch comment.');
  }
 
  return {commentId: data.name};
}

export const getComments = async (quoteId: string) => {
   
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);
  const data = await response.json();
 
  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch comments.');
  }
  
  const transformedData: {id: string, text: string}[] = [];
  for (const key in data) transformedData.push({id: key, ...data[key]});
  return transformedData;
}
