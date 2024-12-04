import styles from './EditPost.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useAuthValue} from '../../context/AuthContext';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const EditPost = () => {
    const {id} = useParams();
    const {document: post} = useFetchDocument('posts', id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const {updateDocument, response} = useUpdateDocument("posts");
  const user = useAuthValue();
  const navigate = useNavigate();
  console.log("User create Post " + user);

  useEffect(() => {
    if(post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTags = post.tags.joinn(",");
      setTags(textTags);
    }

  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validar a url da imagem
    try {
      new URL(image)
    } catch (error) {
      setFormError("URL da imagem inválida");
    }
    //criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    //checar todos os valores

    if(!title || !image || !body || !tags) { setFormError("Por favor preencha todos os cmapos!!!"); }
    if (formError) return;
    updateDocument({title, image, body, tags: tagsArray, uid:  user.uid, createdBy:  user.displayName});
    
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Edit Post {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
                <span>Título: </span>
                <input type='text' name='title' required placeholder='Pense em um bom título...' onChange={(e)=> setTitle(e.target.value)}></input>
            </label>
            <label>
                <span>URL da imagem: </span>
                <input type='text' name='image' required placeholder='Insira uma imagem que represente o seu post...' onChange={(e)=> setImage(e.target.value)}></input>
            </label>
            <p className={styles.preview_title}>Preview da imagem atual: </p>
            <img src={post.image} alt={post.title} className={styles.preview_image}/>
            <label>
                <span>Conteúdo: </span>
                <input name='body' value={body} required placeholder='Insira uma imagem que represente o seu post...' onChange={(e)=> setBody(e.target.value)}></input>
            </label>
            <label>
                <span>Tags: </span>
                <input type='text' name='tags' required placeholder='Insira as tags separadas por virgulas...' onChange={(e)=> setTags(e.target.value)}></input>
            </label>
            {!response.loading && <button >Enviar modificações</button>}
            {response.loading && <button disabled>Carregando...</button>}
            {response.error && <p className="error">{response.error.message}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost;