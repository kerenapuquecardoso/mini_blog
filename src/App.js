import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
import Home from './pages/home/Home';
import About from './pages/about/About';
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import CreatePost from './pages/createPost/CreatePost';
import Dashboard from './pages/dashboard/Dashboard';      
import Search from './pages/search/Search';
import Post from './pages/post/Post';
import EditPost from './pages/edit/edit';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user);
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <AuthProvider value={user}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/about" element={<Post />} />
              <Route path="/posts/:id" element={<Home />} />
              <Route path="/login" element={ <Login />} />
              <Route path="/register" element={ <Register />} />
              <Route path="/dashboard" element={<Dashboard />} /> {/*element={user ? <Dashboard /> : <Navigate to="/login" />*/}
              <Route path="/posts/create" element={<CreatePost />} />
              <Route path="/posts/edit" element={<EditPost />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;