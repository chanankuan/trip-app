import React, { useContext } from 'react';
import auth from '../../service/auth';
import styles from './SignIn.module.css';
import { getAuth } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';

const SignIn: React.FC = () => {
  const context = useContext(AuthContext);

  const handleSignIn = async () => {
    try {
      await auth.signInWithGoogle();
      const userAuth = getAuth();

      if (!userAuth.currentUser) return;

      context?.setUser({
        fullName: userAuth.currentUser?.displayName,
        email: userAuth.currentUser?.email,
        id: userAuth.currentUser?.uid,
      });
    } catch {
      alert('Oops, something went wrong. Please refresh the page.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trip App</h1>
      <button className={styles.signIn} onClick={handleSignIn}>
        Sign In With Google
      </button>
    </div>
  );
};

export default SignIn;
