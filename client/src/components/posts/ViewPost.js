import React, { Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';

import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';

const PostItem = ({ match, history }) => {
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);

  const { user } = authContext;

  const { current, loading, getPost, clearCurrentPost, deletePost } =
    postContext;

  const { id } = match.params;

  useEffect(() => {
    authContext.loadUser();
    getPost(id);

    // eslint-disable-next-line
  }, []);

  const onDelete = () => {
    deletePost(current._id);
    clearCurrentPost();

    history.push('/');
  };

  const authLinks = (
    <span style={{ float: 'right' }}>
      <Link
        className='btn btn-outline-primary btn-sm m-2'
        to={`/post/update/${id}`}
      >
        Update
      </Link>
      <button className='btn btn-outline-danger btn-sm' onClick={onDelete}>
        Delete
      </button>
    </span>
  );

  return (
    <Fragment>
      {current !== null && !loading ? (
        <div className='row pt-5'>
          <div className='col-md-10 mx-auto'>
            <div className='text-center'>
              <h1 className='pb-4'>{current.title}</h1>
              <div className='d-flex justify-content-between'>
                <div>
                  <img
                    src={current.user.profilePicture}
                    style={roundImgStyle}
                    alt=''
                  />
                  <span className='text-success'>
                    {' '}
                    {current.user.fullName}{' '}
                  </span>
                  <small className='text-secondary m-1'>
                    {' '}
                    21st April, 2021
                  </small>
                </div>
                <div>
                  {(user.role === 'admin' || user._id === current.user._id) &&
                    authLinks}
                </div>
              </div>
              <hr />
              <img src={current.image} alt='' className='img-fluid' />
              <hr />
            </div>
            <p className='lead p-4 text-justify'>{current.content}</p>
          </div>
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
