import React from 'react';
import signInWithGoogle from '../../helpers/signIn';
import styles from './SignIn.module.css';

const SignIn = () => {
  return (
    <button className={styles.signIn} onClick={signInWithGoogle}>
      Sign In With Google
    </button>
  );
};

export default SignIn;
