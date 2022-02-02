import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Quote from './pages/Quote';
import Quotes from './pages/Quotes';
import NewQuote from './pages/NewQuote';
import Comments from './components/comments/Comments';
import NotFound from './pages/NotFound';

export interface QuoteType {
  id: string,
  author: string,
  text: string
}

// const DUMMY_QUOTES: QuoteType[] = [
//   {id: 'q1', author: 'Ivan', text: 'Pigs are the best creatures all over the world!!!'},
//   {id: 'q2', author: 'Yana', text: 'I hate winter. I should be born somewhere in warm place...'},
//   {id: 'q3', author: 'Leskovsky', text: 'You must work and do your best!'}
// ]

function App() {
  // const [arrayInx, setArrayInx] = React.useState<number>(0);

  // const {sendRequest, data, error ,status} = useHTTP(postQuote);

  // React.useEffect(
  //   ()=>{
  //       if (arrayInx === DUMMY_QUOTES.length) return;
  //       const newQuote = DUMMY_QUOTES[arrayInx];
  //       console.log(newQuote);
        
  //       sendRequest( 
  //         newQuote
  //       )
  //       setArrayInx(prev=>prev+1);
  //   }, [data]
  // )

  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Navigate to={'quotes'} replace/>}/>
          <Route path={'quotes'} element={<Quotes/>}/>
          <Route path={'quotes/:quoteId'} element={<Quote/>}>
            <Route path={'comments'} element={<Comments />}/>
          </Route>
          <Route path={'new-quote'} element={<NewQuote/>}/>
          <Route path={'*'} element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
