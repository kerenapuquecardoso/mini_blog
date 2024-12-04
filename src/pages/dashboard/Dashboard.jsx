import styles from './Dashboard.module.css'
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const {user} = useAuthValue();
  const uid = user.uid;
  const {documents: posts, loading} =  useFetchDocuments('posts', null, uid);

  const deleteDocumet = (id) => {

  };

  if(loading){};
  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os sesu posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className='btn'>Criar primeiro post!</Link>
        </div>

      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>

          {posts.map((post) => <div className={styles.post_row}   key={post.id}>
            <p>{post.title}</p>
            <div>
              <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver</Link>
              <Link to={`/posts/edit/${post.id} `} className='btn btn-outline'></Link>
              <button onClick={() => deleteDocumet(post.id)} className='btn-danger'>Deletar</button>
            </div>
          </div>)}
        </>
      )}
      
    </div>
  )
}

export default Dashboard;