import { useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHTTP from '../hooks/useHTTP';
import { getQuote } from '../lib/api';

const Quote = () => {
   const {quoteId} = useParams<'quoteId'>();
   const path = useLocation();
   const {error, data, sendRequest, status} = useHTTP(getQuote);

   useEffect(
      () => {
         if (quoteId) sendRequest(quoteId);
      }, [sendRequest, quoteId]
   )  

   if (status === 'pending') return (
      <div className="centered">
         <p>Loading ...</p>
      </div>
   )

   if (error) return (
      <div className="centered focused">
         <p>{error}</p>
      </div>
   )

   if (!data) {return <p>Not quote found...</p>;}
   
   const {author, text} = data; 

   return <div>
      <HighlightedQuote author={author} text={text} />
      {!path.pathname.includes(`/quotes/${quoteId}/comments`) && <div className='centered'>
         <Link className='btn--flat' to={`comments`}>Load comments</Link>
      </div>}
      <Outlet />
   </div>;
};

export default Quote;
