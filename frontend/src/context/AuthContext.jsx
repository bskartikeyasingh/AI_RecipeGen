import {

  createContext,

  useContext,

  useEffect,

  useState

} from "react";

import {

  onAuthStateChanged,

  signInWithPopup,

  signOut,

  signInWithEmailAndPassword,

  createUserWithEmailAndPassword

} from "firebase/auth";

import {

  auth,

  provider

} from "../firebase/firebase";

const AuthContext =
  createContext();

export const useAuth = () =>
  useContext(AuthContext);

export const AuthProvider = ({
  children
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ====================================
  // CHECK USER
  // ====================================

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        (currentUser) => {

          setUser(
            currentUser
          );

          setLoading(false);
        }
      );

    return () =>
      unsubscribe();

  }, []);

  // ====================================
  // GOOGLE LOGIN
  // ====================================

  const googleLogin =
    async () => {

      try {

        await signInWithPopup(

          auth,

          provider
        );

      } catch (error) {

        console.log(error);
      }
    };

  // ====================================
  // EMAIL LOGIN
  // ====================================

  const emailLogin =
    async (

      email,

      password

    ) => {

      return await
      signInWithEmailAndPassword(

        auth,

        email,

        password
      );
    };

  // ====================================
  // REGISTER
  // ====================================

  const register =
    async (

      email,

      password

    ) => {

      return await
      createUserWithEmailAndPassword(

        auth,

        email,

        password
      );
    };

  // ====================================
  // LOGOUT
  // ====================================

  const logout =
    async () => {

      await signOut(auth);
    };

  return (

    <AuthContext.Provider

      value={{

        user,

        googleLogin,

        emailLogin,

        register,

        logout
      }}
    >

      {

        !loading &&
        children
      }

    </AuthContext.Provider>
  );
};