import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../server/firebase';

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    localStorage.setItem('userID', JSON.stringify(user.uid));
    location.reload();
  } catch (error) {
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }
};

export default signInWithGoogle;
