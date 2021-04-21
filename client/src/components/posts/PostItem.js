import React from 'react';

const PostItem = ({ post }) => {
  const { _id, title, image, summary } = post;

  return (
    <div>
      <h3 className='text-primary'>{title}</h3>
      <img className='img' src={image} alt='' style={{ height: '50%' }} />
      <p>{summary}</p>
      <div className='text-center my-1'>
        <button className='btn btn-primary btn-sm'>Read</button>
      </div>
    </div>
  );
};

export default PostItem;
