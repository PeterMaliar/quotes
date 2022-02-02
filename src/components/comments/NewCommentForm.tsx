import React, { FormEvent, ForwardedRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHTTP from '../../hooks/useHTTP';
import { addComment } from '../../lib/api';
import styles from './NewComment.module.scss';

interface NewCommentFormProps {
   onAddComment: VoidFunction
}

const NewCommentForm = React.forwardRef(({onAddComment}: NewCommentFormProps, ref: ForwardedRef<HTMLFormElement>) => {
   const {quoteId} = useParams<'quoteId'>();
   const { sendRequest, error, status} = useHTTP(addComment);
   const submitHandler = (e: FormEvent) => {
      e.preventDefault();
      sendRequest({text: (e.target as HTMLFormElement)['comment'].value, quoteId}); 
      if (status === 'completed') (e.target as HTMLFormElement).reset();
   }

   useEffect(
      () => {
         if (!error && status === 'completed') onAddComment();
      }, [error, status, onAddComment]
   )

   if (status === 'pending') return (
      <div className="centered">
         <p>Sending a comment...</p>
      </div>
   )


   return <div>
      <form ref={ref} className={styles.form} onSubmit={submitHandler}>
         <label htmlFor="comment">Your comment</label>
         <textarea name="comment" id="comment" cols={30} rows={5}/>
      </form>
   </div>;
});

export default NewCommentForm;
