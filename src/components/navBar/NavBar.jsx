import React from 'react'
import styles from './NavBar.module.css';
import {NavLink} from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';
const NavBar = () => {
    const user  = useAuthValue();
    const {logout} = useAuthentication();
    console.log("Usre nav bar " + user);
  return (
    <div>
        <NavLink to="/">
            Code <span>Cook</span> 
        </NavLink>
        
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            {!user && (
                <>
                       <li>
                            <NavLink to="/register">Register</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                </>
            )}
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
            {
                user && (
                    <>
                        <li>
                            <NavLink to="/posts/create">Create Post</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                        </li>
                    </>
                )
            }
            {user && (
                <li><button onClick={logout}>Logout</button></li>
            )}
        </ul>
    </div>
  )
}

export default NavBar