import React, { useEffect, useState } from 'react';

import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';

const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const userId = localStorage.getItem('userID');
    if (!userId) return;

    setIsSignedIn(true);
  }, []);

  return isSignedIn ? <Home /> : <SignIn handleSignIn={setIsSignedIn} />;
};

export default App;
