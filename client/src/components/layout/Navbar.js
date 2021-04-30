import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLeftLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link to='/'>
          <span className='nav-link active'>Home</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/post/add'>
          {' '}
          <span className='nav-link active'>Add Post</span>
        </Link>
      </li>
    </Fragment>
  );

  const authRightLinks = (
    <Fragment>
      <li className='nav-item'>
        <a className='nav-link active' aria-current='page' href='!#'>
          Hello, {user && user.firstName}
        </a>
      </li>
      <li className='nav-item'>
        <a
          onClick={onLogout}
          href='#!'
          className='nav-link active'
          aria-current='page'
        >
          <span>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLeftLinks = <Fragment></Fragment>;

  const guestRightLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link to='/login'>
          <span className='nav-link active'>Login</span>
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='!#'>
          <i className={icon} /> {title}
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            {isAuthenticated ? authLeftLinks : guestLeftLinks}
          </ul>
          <ul className='navbar-nav justify-content-end'>
            {isAuthenticated ? authRightLinks : guestRightLinks}
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
