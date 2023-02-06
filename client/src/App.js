import { auth, provider } from "./firebase"
import { useState,useEffect } from 'react'
import Data from "./components/Data";
import React from 'react'
import Header from './components/Header';
import './App.css'

function App() {
  const [user, setUser] = useState(null)

    // Check local storage on each page load
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

  const signIn = () =>{
    auth.signInWithPopup(provider).then(({user})=>{
      setUser(user)
    }).catch(error=>{
      alert(error.message);
    })
  }

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  }

  return (
    <>
    {
      user ? (
        <>
          <Header user={user} signOut={signOut} />
          <div className="App">
            <Data/>
          </div>
        </>
      ):(
        <div className="loginWrap">
          <button onClick={signIn} className="login-button"> 
            <div className="icon">
              <img src="https://img.icons8.com/color/2x/google-logo.png" alt="google" />
            </div>
            Sign in with Google
          </button>
        </div>
      )
    }
    </>
  );
}

export default App;