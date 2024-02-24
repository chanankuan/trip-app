import React, { useEffect, useState } from 'react';

import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import { AuthContext, defaultValue } from './components/context/AuthContext';
import { IUser } from './components/context/AuthContext';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<IUser>(defaultValue);

  useEffect(() => {
    const auth: Auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in
        setUser({
          fullName: user.displayName,
          email: user.email,
          id: user.uid,
        });
      } else {
        // User is signed out
        setUser(defaultValue);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user.email ? <Home /> : <SignIn />}
    </AuthContext.Provider>
  );
};

export default App;
