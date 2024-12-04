import styles from './Post.module.css';
import React from 'react'
import {userParams} from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
const Post = () => {
  const {id} = userParams();
  const {document: post, loading} = useFetchDocument('posts', id);
  return (
    <div className={styles.post_container}>
         {loading && <p>Carregando...</p>}
        {post && (
            <>  
               
                <h1>{post.title}</h1>
                <img src={post.image} alt={post.title}/>
                <p>{post.body}</p>
                <h3>Este post tarta sobre: </h3>
                <div className={styles.tags}>
                    {post.tags.map((tag) => (
                        <p key={tag}><span>#</span>{tag}</p>
                    ))}
                </div>
            </>
        )}
    </div>
  )
}

export default Post