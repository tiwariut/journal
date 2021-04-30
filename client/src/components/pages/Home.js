import React, { useContext, useEffect } from 'react';

import Posts from '../posts/Posts';

import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <Posts />
      </div>
    </div>
  );
};

export default Home;
