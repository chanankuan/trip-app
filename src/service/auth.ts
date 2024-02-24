import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../server/firebase';

const signInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const { uid, email, displayName } = result.user;

    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, 'users', uid), {
        fullName: displayName,
        email,
        uid,
      });
    }

    localStorage.setItem('uid', JSON.stringify(uid));
  } catch (error) {
    alert('Oops, something went wrong. Please refresh the page.');
  }
};

const signOutWithGoogle = async (): Promise<void> => {
  const auth = getAuth();
  await signOut(auth);
  localStorage.removeItem('uid');
};

export default { signInWithGoogle, signOutWithGoogle };
