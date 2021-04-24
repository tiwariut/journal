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
          <h1>{current.title}</h1>
          <img src={current.image} alt='' />
          <p>{current.content}</p>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default PostItem;
