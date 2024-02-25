import React, { useEffect, useState } from 'react';

import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import { AuthContext, defaultValue } from './components/context/AuthContext';
import { IUser } from './components/context/AuthContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loader from './components/Loader/Loader';

const App: React.FC = () => {
  const [user, setUser] = useState<IUser>(defaultValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in
        setUser({
          fullName: user.displayName,
          email: user.email,
          id: user.uid,
        });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading && <Loader />}
      {user.email && <Home />}
      {!user.email && !isLoading && <SignIn />}
    </AuthContext.Provider>
  );
};

export default App;
