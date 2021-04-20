import React from 'react';

const PostItem = ({ post }) => {
  const { _id, title, image, summary } = post;

  return (
    <div className='card bg-light'>
      <h3 className='text-primary'>{title}</h3>
      <img src={image} alt='' />
      <p>{summary}</p>
      <button className='btn btn-primary btn-sm'>Read</button>
    </div>
  );
};

export default PostItem;
