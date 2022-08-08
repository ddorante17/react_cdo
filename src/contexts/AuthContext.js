import {createContext, useContext, useEffect, useState} from "react";
import db, {auth} from "../firebase";
import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset
} from "firebase/auth";
import { ref, get, child } from "firebase/database"

const AuthContext = createContext({
    currentUser: null,
    register: () => Promise,
    signIn: () => Promise,
    logout: () => Promise,
    forgotPassword: () => Promise,
    resetPassword: () => Promise
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const getData = ref(db);

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, user => {
            if(user){
                get(child(getData, "users/" + user.uid)).then((snapshot) => {
                    const user = snapshot.val();
                    setCurrentUser(user);
                });
            }
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

    function forgotPassword(email){
        return sendPasswordResetEmail(auth, email, {
            url: 'http://localhost:3000/singUp'
        })
    }

    function resetPassword(oobCode, newPassword){
        return confirmPasswordReset(auth, oobCode, newPassword)
    }

    const value = {
        currentUser,
        register,
        signIn,
        logout,
        forgotPassword,
        resetPassword
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
