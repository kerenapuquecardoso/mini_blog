import styles from './Login.module.css';
import {useState, useEffect} from 'react'
import { useAuthentication } from '../../hooks/useAuthentication';
import { Navigate } from 'react-router-dom';
const Login = () => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login, error: errorAuthentication, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const usuario = {
      email,
      password
    };

    const res = await login(usuario);
    
    console.log(res);

    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (errorAuthentication) {
      setError(errorAuthentication);
    }
  }, [errorAuthentication]);
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <p>Authentique-se para acesssar o sistema</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="E-mail do usuário"
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Senha do usuário"
          />
        </label>
        {!loading && <button className={styles.btn} onClick={Navigate.to="/"}>Login</button>}
        {loading && <button className={styles.btn} disabled>Carregando...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login;