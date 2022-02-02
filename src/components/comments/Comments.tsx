import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHTTP from '../../hooks/useHTTP';
import { getComments } from '../../lib/api';
import styles from './Comments.module.scss';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
   const [isAddingComment, setIsAddingComment] = React.useState<boolean>(false);
   const formRef = React.useRef<HTMLFormElement>(null);
   const {quoteId} = useParams<'quoteId'>();
   const { sendRequest, data, status } = useHTTP(getComments);

   const clickHandler = () => {
      // Add Comment mode
      if (!isAddingComment) setIsAddingComment(true);
      // Submit textarea input mode
      if (isAddingComment && formRef.current) formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
   }

   useEffect(
      () => {
         if (quoteId) sendRequest(quoteId);
      }, [isAddingComment, sendRequest, quoteId]
   )

   return <section className={styles.comments}>
      <h1>User Comments</h1>
      {data && !data.length && <p>Comments list is empty...</p>}
      {
         data && <ul>
            {data.map((data: any, inx: number) => <li key={data.id}>{inx+1}) {data.text}</li>)}
         </ul>
      }
      { status==='pending' && 
         <div className = 'centered'>
            <p>Loading comments...</p>
         </div>
      }
      {isAddingComment && <NewCommentForm ref={formRef} onAddComment = {()=>{setIsAddingComment(false)}}/>}
      <button onClick={clickHandler}>Add a comment</button>
   </section>
}

export default Comments;
