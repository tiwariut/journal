import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  const { _id, title, image, summary, category } = post;

  return (
    <div className='col' style={{ marginTop: '40px' }}>
      <div className='card mb-3' style={{ maxWidth: '540px' }}>
        <div className='row g-0'>
          <div className='col-md-4'>
            <img
              src={image}
              alt='...'
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <h5 className='card-title text-primary'>{title}</h5>
              <p className='card-text' style={{ minHeight: '100px' }}>
                {summary}
              </p>
              <p className='card-text'>
                <small className='text-muted'>{category.name}</small>
              </p>
              <Link
                className='btn btn-sm btn-outline-primary'
                to={`/post/view/${_id}`}
              >
                Read
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
