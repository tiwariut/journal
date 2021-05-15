import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  const { _id, title, image, summary, category } = post;

  return (
    <Fragment>
      <div className='media mt-2'>
        <img
          className='mr-3 mt-3 align-self-center'
          src={image}
          alt=''
          style={imageStyle}
        />
        <div className='media-body'>
          <Link to={`/post/view/${_id}`} style={{ textDecoration: 'none' }}>
            <h5>{title}</h5>
          </Link>
          {summary}
          <div className='d-flex justify-content-between mt-4  '>
            <small className='text-secondary'>1st January 2021</small>
            <span className='badge badge-primary d-none d-md-block'>
              {category.name}
            </span>
          </div>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};

const imageStyle = {
  width: '180px',
  height: '120px',
  objectFit: 'cover'
};

export default PostItem;
