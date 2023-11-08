import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../firebase/firebase.config";
// import axios from "axios";




const googleProvider = new GoogleAuthProvider();
export const AuthContext= createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading] = useState(true);

    //creating new user
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    //signIn user
    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    // sign In with google
   const signInWithGoogle=()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
   }

    //signOut
    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

    // observer
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
            

            
        } );
        return ()=>{
            unsubscribe();
        } 
     },[])
    

const authInfo={
    user,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    loading,

}


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node,
  };