import React, { Fragment, useContext } from 'react';
import PostItem from './PostItem';
import PostContext from '../../context/post/postContext';

const Posts = () => {
  const postContext = useContext(PostContext);

  const { posts } = postContext;

  return (
    <Fragment>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </Fragment>
  );
};

export default Posts;
