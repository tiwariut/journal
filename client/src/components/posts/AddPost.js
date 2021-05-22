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
  const { addPost } = postContext;

  useEffect(() => {
    authContext.loadUser();
    getCategories();

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
    <div className='row'>
      <div className='col-md-6 mx-auto mt-4 pt-5'>
        <div className='card'>
          <div className='card-header'>
            <h4 className='text-center'>Add Post</h4>
          </div>
          <div className='card-body'>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
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
                  maxLength='100'
                  required
                />
                <small className='form-text text-muted'>
                  Max 100 characters
                </small>
              </div>
              <div className='form-group'>
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
              <div className='form-group'>
                <label htmlFor='category'>Category</label>
                <select
                  className='form-control'
                  id='category'
                  name='category'
                  value={category}
                  onChange={onCategoryChange}
                  required
                >
                  <option value=''>Select</option>
                  {categories !== null &&
                    !categoryLoading &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='subcategory'>Subcategory</label>
                <select
                  className='form-control'
                  id='subcategory'
                  name='subcategory'
                  value={subcategory}
                  onChange={onChange}
                  required
                >
                  <option value=''>Select</option>
                  {subcategories !== null &&
                    !subcategoryLoading &&
                    subcategories.map((subcategory) => (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='summary' className='form-label'>
                  Summary
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
                <small className='form-text text-muted'>
                  Max 150 characters
                </small>
              </div>
              <div className='form-group'>
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
              <input
                type='submit'
                value='Post'
                className='btn btn-dark btn-block'
              />
            </form>
          </div>
        </div>
      </div>
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
