import { useNavigate } from 'react-router-dom';
import styles from './CreatePost.module.css';
import {useState} from 'react';
import {useAuthValue} from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const {insertDocument, response} = useInsertDocument("posts");
  const user = useAuthValue();
  const navigate = useNavigate();
  console.log("Usre createPóst " + user);

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
    insertDocument({title, image, body, tags: tagsArray, uid:  user.uid, createdBy:  user.displayName});
    
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>CreatePost</h2>
      <p>Escreva sobre programação ou culinária e compartilhe seu conhecimento </p>
      <form onSubmit={handleSubmit}>
        <label>
            <span>Título: </span>
            <input type='text' name='title' required placeholder='Pense em um bom título...' onChange={(e)=> setTitle(e.target.value)}></input>
        </label>
        <label>
            <span>URL da imagem: </span>
            <input type='text' name='image' required placeholder='Insira uma imagem que represente o seu post...' onChange={(e)=> setImage(e.target.value)}></input>
        </label>
        <label>
            <span>Conteúdo: </span>
            <input name='body' value={body} required placeholder='Insira uma imagem que represente o seu post...' onChange={(e)=> setBody(e.target.value)}></input>
        </label>
        <label>
            <span>Tags: </span>
            <input type='text' name='tags' required placeholder='Insira as tags separadas por virgulas...' onChange={(e)=> setTags(e.target.value)}></input>
        </label>
        {!response.loading && <button >Cadastrar</button>}
        {response.loading && <button disabled>Carregando...</button>}
        {response.error && <p className="error">{response.error.message}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost;