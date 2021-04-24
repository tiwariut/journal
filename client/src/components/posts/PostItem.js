import React from 'react';

const PostItem = ({ post }) => {
  const { _id, title, image, summary, category } = post;

  return (
    <div className='col' style={{ marginTop: '40px' }}>
      <div class='card mb-3' style={{ maxWidth: '540px' }}>
        <div class='row g-0'>
          <div class='col-md-4'>
            <img
              src={image}
              alt='...'
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div class='col-md-8'>
            <div class='card-body'>
              <h5 class='card-title' style={{ color: '#0d6efd' }}>
                {title}
              </h5>
              <p class='card-text'>{summary}</p>
              <p class='card-text'>
                <small class='text-muted'>{category.name}</small>
              </p>
              <button className='btn btn-sm btn-outline-primary'>Read</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
