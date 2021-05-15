import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Login from './components/auth/Login';
import ViewPost from './components/posts/ViewPost';
import AddPost from './components/posts/AddPost';
import UpdatePost from './components/posts/UpdatePost';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import PostState from './context/post/PostState';
import CategoryState from './context/category/CategoryState';
import SubcategoryState from './context/subcategory/SubcategoryState';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <PostState>
          <CategoryState>
            <SubcategoryState>
              <Router>
                <Fragment>
                  <Navbar />
                  <div className='container' style={{ marginTop: '5rem' }}>
                    <Alerts />
                    <Switch>
                      <PrivateRoute exact path='/' component={Home} />
                      <Route exact path='/about' component={About} />
                      <Route exact path='/login' component={Login} />
                      <PrivateRoute
                        exact
                        path='/post/view/:id'
                        component={ViewPost}
                      />
                      <PrivateRoute
                        exact
                        path='/post/add'
                        component={AddPost}
                      />
                      <PrivateRoute
                        exact
                        path='/post/update/:id'
                        component={UpdatePost}
                      />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                  <Footer />
                </Fragment>
              </Router>
            </SubcategoryState>
          </CategoryState>
        </PostState>
      </AlertState>
    </AuthState>
  );
};

export default App;
