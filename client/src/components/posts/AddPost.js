import React from 'react';

const AddPost = () => {
  return (
    <div>
      <h1>Add Post</h1>
      <form className='form-container'>
        <form-group>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' />
        </form-group>
      </form>
    </div>
  );
};

export default AddPost;
