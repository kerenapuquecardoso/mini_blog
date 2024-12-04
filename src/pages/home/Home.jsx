
import styles from './Home.module.css';
import {useNavigate, Link} from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetail from '../../components/posts/PostDetail';

const Home = () => {
  const [query, setQuery] = useState('');
  const {documents: posts, loading} = useFetchDocuments('posts');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`);	
    }
  }
  return (
    <div>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Ou busque por tags' onChange={(e) => setQuery(e.target.value)}></input>
        <button >Buscar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <PostDetail post={post} key={post.id} />
        ))}
        {posts && posts.length===0 && (
          <div className={styles.noposts}> 
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create"  className='btn-dark'>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;