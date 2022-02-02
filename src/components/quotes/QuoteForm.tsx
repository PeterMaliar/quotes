import React, { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHTTP from '../../hooks/useHTTP';
import { addQuote } from '../../lib/api';
import Card from '../UI/Card';
import styles from './QuoteForm.module.scss';

const QuoteForm = () => {
   const authorRef = React.useRef<HTMLInputElement>(null);
   const textRef = React.useRef<HTMLTextAreaElement>(null);   

   const {sendRequest, error, status} = useHTTP(addQuote);
   const navigate = useNavigate();

   const submitHandler = (e: FormEvent) => {
      e.preventDefault();
      sendRequest({author: authorRef.current!.value, text: textRef.current!.value});
   }

   useEffect(() => {
     if (status === 'completed' && !error) navigate('/quotes');    
   }, [status, error, navigate]);

   if (status === 'pending') return (
      <div className="centered">
         <p>Sendind data...</p>
      </div>
   )

   if (error) return (
      <div className="centerd focused">
         <p>{error}</p>
      </div>
   )

   return (
      <Card>
         <form onSubmit={submitHandler} className={styles.form} autoComplete='off'>
            <div className={styles.control}>
               <label htmlFor="author">Author: </label>
               <input type="text" ref={authorRef} id="author"/>
            </div>
            <div className={styles.control}>
               <label htmlFor="text">Text: </label>
               <textarea ref={textRef} cols={30} rows={5}/>
            </div>
            <button type='submit'>Add Quote</button>
         </form>
      </Card>
   )
};

export default QuoteForm;
