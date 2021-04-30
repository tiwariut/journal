import React, { Fragment, useEffect, useContext } from 'react';

import Spinner from '../layout/Spinner';

import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';

const PostItem = ({ match }) => {
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);

  const { current, loading, getPost } = postContext;

  const { id } = match.params;

  useEffect(() => {
    authContext.loadUser();
    getPost(id);

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {current !== null && !loading ? (
        <div>
          <h1 className='text-center mt-4'>{current.title}</h1>
          <hr />
          <div>
            <img
              src={current.user.profilePicture}
              style={roundImgStyle}
              alt=''
            />
            <span className='text-success'> {current.user.fullName} </span>
            <span className='text-secondary m-2'> 21st April, 2021</span>
            <button
              className='btn btn-outline-secondary'
              style={{ float: 'right' }}
            >
              Edit
            </button>
          </div>
          <img src={current.image} alt='' style={{ width: '100%' }} />
          <hr />
          <p className='lead p-4'>{current.content}</p>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

const roundImgStyle = {
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  marginBottom: '10px'
};

export default PostItem;
