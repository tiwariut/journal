import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link' to='/post/add'>
          Add Post
        </Link>
      </li>
      <li className='nav-item'>
        <a className='nav-link' onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar fixed-top navbar-expand-sm navbar-light bg-light mb-3 border-bottom'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          <div className='d-flex flex-column justify-content-center align-items-center pr-3 border-right text-secondary font-weight-bold'>
            <i className='fas fa-book-open fa-2x'></i>
            <span className='display-7 d-none d-md-block'>Journal</span>
          </div>
        </Link>
        {isAuthenticated && (
          <span className='display-5 text-white d-none d-md-block text-secondary font-weight-bold'>
            Hello, {user && user.firstName}
          </span>
        )}
        <button
          className='navbar-toggler'
          data-toggle='collapse'
          data-target='#navbarNav'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Journal',
  icon: 'fas fa-book-open'
};

export default Navbar;
