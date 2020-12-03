import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import Imessage from './Imessage'
import Login from './Login';

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() =>{
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        //user is logged in
        dispatch(login({
          uid: authUser.uid,
          photoUrl: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else{
        //user logged out
        dispatch(logout())
      }
    })
  },[dispatch])

  return (
    <div className="App">
      {user ? <Imessage /> : <Login />}
    </div>
  );
}

export default App;
