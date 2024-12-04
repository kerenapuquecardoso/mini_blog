// FILE: src/hooks/useAuthentication.js
import {db, auth} from '../firebase/config';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile , signOut} from 'firebase/auth';
import { useState, useEffect } from 'react';

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled  ()  {
    if (cancelled) {
      return;
    }
  };

  const createUser = async (data) => {
    checkIfIsCancelled();
    
    setLoading(true);
    setError(null);
    try {
      
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(user, { displayName: data.inputName });
      setLoading(false);
      console.log("Valor do usuário no createUser", user);
      return user;
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa ter no mínimo 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Erro ao criar usuário.";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  const login = async(data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta";
      } else {
        systemErrorMessage = "Erro ao fazer login.";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  }

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  }

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return { auth, createUser, error, loading, login, logout };
};