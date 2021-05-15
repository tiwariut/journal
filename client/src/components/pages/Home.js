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
    <div className='row'>
      <div className='col-md-8 mt-4'>
        <Posts />
      </div>
      <div className='col-md-4 text-center mt-4 d-none d-md-block'>
        <h2 className='text-primary'>Explore</h2>
      </div>
    </div>
  );
};

export default Home;
