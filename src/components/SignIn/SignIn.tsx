import React, { MouseEvent, useContext } from 'react';
import auth from '../../service/auth';
import styles from './SignIn.module.css';
import { getAuth } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';

const SignIn: React.FC = () => {
  const context = useContext(AuthContext);

  const parallax = (e: MouseEvent): void => {
    let movementStrength: number = 25;
    let height: number = movementStrength / window.innerHeight;
    let width: number = movementStrength / window.innerWidth;
    let pageX: number = e.pageX - window.innerWidth / 2;
    let pageY: number = e.pageY - window.innerHeight / 2;
    let newvalueX: number = width * pageX * -1 - 25;
    let newvalueY: number = height * pageY * -1 - 50;

    const targetElement = e.target as HTMLDivElement;
    targetElement.style.backgroundPosition = `${newvalueX}px ${newvalueY}px`;
  };

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
    <div className={styles.container} onMouseMove={parallax}>
      <h1 className={styles.title}>Trip App</h1>
      <button className={styles.signIn} onClick={handleSignIn}>
        Sign In With Google
      </button>
    </div>
  );
};

export default SignIn;
