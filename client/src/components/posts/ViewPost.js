import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import PostContext from '../../context/post/postContext';

const PostItem = ({ match }) => {
  const postContext = useContext(PostContext);

  const { setCurrentPost, current, loading } = postContext;

  const { id } = match.params;

  useEffect(() => {
    setCurrentPost(id);
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {current !== null && !loading ? (
        <div>
          <h1 class='text-center mt-4'>{current.title}</h1>
          <hr />
          <div className>
            <img src={current.user.profilePicture} style={roundImgStyle} />
            <span className='text-success'> {current.user.fullName} </span>
            <span className='text-secondary m-2'> 21st April, 2021</span>
            <btn
              className='btn btn-outline-secondary'
              style={{ float: 'right' }}
            >
              Edit
            </btn>
          </div>
          <img src={current.image} alt='' style={{ width: '100%' }} />
          <hr />
          <p class='lead p-4'>{current.content}</p>
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
