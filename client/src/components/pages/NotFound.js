import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';

const NotFound = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      <h1 className='mt-4'>Not Found</h1>
      <p className='lead'>The page you are looking for does not exists...</p>
    </div>
  );
};

export default NotFound;
