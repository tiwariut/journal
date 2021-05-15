import React, { Fragment, useContext, useEffect } from 'react';

import PostItem from './PostItem';
import Spinner from '../layout/Spinner';

import PostContext from '../../context/post/postContext';

const Posts = () => {
  const postContext = useContext(PostContext);

  const { posts, getPosts, loading } = postContext;

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {posts !== null && !loading ? (
        <div>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Posts;
