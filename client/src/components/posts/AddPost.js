import React, { useEffect, useContext, useState } from 'react';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import CategoryContext from '../../context/category/categoryContext';
import SubcategoryContext from '../../context/subcategory/subcategoryContext';
import PostContext from '../../context/post/postContext';

const AddPost = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const categoryContext = useContext(CategoryContext);
  const subcategoryContext = useContext(SubcategoryContext);
  const postContext = useContext(PostContext);

  const { setAlert } = alertContext;
  const {
    categories,
    getCategories,
    loading: categoryLoading
  } = categoryContext;
  const {
    subcategories,
    getSubcategories,
    loading: subcategoryLoading
  } = subcategoryContext;
  const { error, addPost } = postContext;

  useEffect(() => {
    authContext.loadUser();
    getCategories();

    // if (error) {
    //   setAlert(error, 'danger');
    // }

    // eslint-disable-next-line
  }, []);

  const [post, setPost] = useState({
    title: '',
    image: '',
    category: '',
    subcategory: '',
    summary: '',
    content: ''
  });

  const { title, image, category, subcategory, summary, content } = post;

  const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });

  const onCategoryChange = async (e) => {
    getSubcategories(e.target.value);
    return setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      title === '' ||
      image === '' ||
      category === '' ||
      subcategory === '' ||
      summary === '' ||
      content === ''
    ) {
      setAlert('Please enter all fields.', 'danger');
    } else {
      addPost(post);
      props.history.push(`/`);
    }
  };

  return (
    <div className='form-container' style={formStyle}>
      <h1 className='text-center' style={{ color: '#0d6efd' }}>
        Add Post
      </h1>

      <form onSubmit={onSubmit}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='title'
            name='title'
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='image' className='form-label'>
            Image URL
          </label>
          <input
            type='text'
            className='form-control'
            id='image'
            name='image'
            value={image}
            onChange={onChange}
            required
          />
        </div>
        <div className='mb-3'>
          <select
            className='form-select'
            name='category'
            value={category}
            onChange={onCategoryChange}
            required
          >
            <option value=''>Category</option>
            {categories !== null &&
              !categoryLoading &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className='mb-3'>
          <select
            className='form-select'
            name='subcategory'
            value={subcategory}
            onChange={onChange}
            required
          >
            <option value=''>Subcategory</option>
            {subcategories !== null &&
              !subcategoryLoading &&
              subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
          </select>
        </div>

        <div className='mb-3'>
          <label htmlFor='summary' className='form-label'>
            Summary <span className='text-secondary'>(max 150 characters)</span>
          </label>
          <textarea
            className='form-control'
            id='summary'
            name='summary'
            value={summary}
            onChange={onChange}
            maxLength='150'
            rows='3'
            required
          ></textarea>
        </div>
        <div className='mb-3'>
          <label htmlFor='content' className='form-label'>
            Content
          </label>
          <textarea
            className='form-control'
            id='content'
            name='content'
            value={content}
            onChange={onChange}
            rows='5'
            required
          ></textarea>
        </div>

        <button
          type='submit'
          className='btn btn-primary'
          style={{
            marginLeft: '38%',
            marginTop: '20px',
            background: '#0d6efd'
          }}
        >
          Post
        </button>
      </form>
    </div>
  );
};

const formStyle = {
  maxWidth: '450px',
  margin: 'auto',
  marginTop: '20px',
  padding: '30px'
};

export default AddPost;
