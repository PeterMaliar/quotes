import { useEffect } from 'react';
import { QuoteType } from '../../App';
import QuoteItem from './QuoteItem';
import styles from './QuoteList.module.scss';
import {useSearchParams} from 'react-router-dom';
import useHTTP from '../../hooks/useHTTP';
import { getQuotes } from '../../lib/api';
import NotFoundQuotes from './NotFoundQuotes';

const QuoteList = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const { sendRequest, error, status, data } = useHTTP(getQuotes);

   const isAscending = searchParams.get('sort') === 'asc';

   const changeSortingHandler = () => {
      setSearchParams({sort: isAscending ? 'dec' : 'asc'})
   }

   const sortedQuotes = (quotes: QuoteType[], isAscending: boolean): QuoteType[] => {
      return quotes.sort((a: QuoteType, b: QuoteType) => {
         if (isAscending) { 
            return a.author > b.author ? 1 : -1
         } else {
            return a.author > b.author ? -1 : 1
         }
      });
   }

   useEffect(
      () => {
         sendRequest();
      }, [sendRequest]
   )

   if (status === 'pending') return (
      <div className='centered'>
         <p>Loading...</p>
      </div>
   )

   if (error) return (
      <div className='centered focused'>
         <p>{error}</p>
      </div>
   )

   if (status === 'completed' && (!data || data.length === 0)) return (
      <div className='centered'>
         <NotFoundQuotes />
      </div>   
   )
   return <>
      <div className={styles.sorting}>
         <button onClick={changeSortingHandler}>Sort {isAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      {<ul className={styles.list}>
         {data && sortedQuotes(data, isAscending).map(quote => <QuoteItem key={quote.id} quote={quote}/>)}
      </ul>}
   </>;
};

export default QuoteList;
