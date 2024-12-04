import React from 'react';
import styles from './About.module.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Code <span>Cook</span></h2>
      <p>Code Cook é um blog de programação para quem gosta de compartilhar conhecimento sobre programação e culinária.</p>
      <Link to="/posts/create">Criar Posts</Link>
    </div>
  )
}

export default About;