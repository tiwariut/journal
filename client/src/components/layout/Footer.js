import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer id='main-footer' className='bg-dark text-white mt-5 p-4'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <p className='lead text-center'>
                Copyright &copy; {new Date().getFullYear()} Journal
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
