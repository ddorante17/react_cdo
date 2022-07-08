import {createContext, useContext, useEffect, useState} from "react";
import {auth} from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext({
    currentUser: null,
    register: () => Promise,
    signIn: () => Promise,
    logout: () => Promise
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        })
        return () => {
            unsubscribe();
        }
    },[]);

    function register(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth);
    }

    const value = {
        currentUser,
        register,
        signIn,
        logout
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
