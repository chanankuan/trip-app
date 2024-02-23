import React from 'react';
import auth from '../../service/auth';
import styles from './SignIn.module.css';

interface Props {
  handleSignIn: (value: boolean) => void;
}

const SignIn: React.FC<Props> = ({ handleSignIn }) => {
  const onSignIn = () => {
    auth.signInWithGoogle();
    handleSignIn(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trip App</h1>
      <button className={styles.signIn} onClick={onSignIn}>
        Sign In With Google
      </button>
    </div>
  );
};

export default SignIn;
