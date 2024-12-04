import styles from './Register.module.css';
import React, { useEffect, useState } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
  const [inputName, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { createUser, error: errorAuthentication, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const user = {
      inputName,
      email,
      password
    };

    if (password !== confirmPassword) {
      setError('Senhas não conferem');
      return;
    }

    const res = await createUser(user);
    
    console.log(res);
    
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  useEffect(() => {
    if (errorAuthentication) {
      setError(errorAuthentication);
    }
  }, [errorAuthentication]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="name"
            value={inputName}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nome do usuário"
          />
        </label>
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
        <label>
          <span>Confirmar senha:</span>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirmar senha do usuário"
          />
        </label>
        {!loading && <button >Cadastrar</button>}
        {loading && <button disabled>Carregando...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;