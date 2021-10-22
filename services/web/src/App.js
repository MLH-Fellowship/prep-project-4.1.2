import React, { lazy, Suspense } from 'react';

// Libraries
import { Router, Route, Switch } from 'react-router-dom';

// Assets
import history from './utils/createBrowserHistory';

// State Handlers
import { WeatherProvider } from './store/contexts/weather.context';

// components
import Layout from './components/marginals/Layout';
import { AccessTokenProvider } from './store/contexts/accessToken.context';
import { Oauth2Callback } from './components/auth/oauth2callback';
import { Login } from './components/auth/login';

/**
 * React has a feature where the production code can
 * be splitted into chunks instead of one single file
 * which helps tremendously for reducing loading times
 * - the function 'lazy' splits the code as per different pages
 *   i.e. the code for home page loads first then for the other pages
 * - the component 'Suspense' helps to show a loading component
 *   when the code is being fetched asynchronously
 * - lazy and Suspense should always be used simultaneously
 *
 * => Steps to add new pages
 * 1. As show below, create a component using lazy function.
 *    Add the location of the page to be loaded.
 * 2. Inside the Switch component, add a new Route component with
 *    the appropriate component and the link for it.
 */
const AsyncWeather = lazy(() => import('./pages/Weather'));
const AsyncNews = lazy(() => import('./pages/News'));
const AsyncError = lazy(() => import('./pages/Error'));
const AsyncTopTens = lazy(() => import('./pages/TopTens'));
const AsyncTopTenPlace = lazy(() => import('./pages/TopTenPlace'));



const App = () => (
  <Router history={history}>
    <WeatherProvider>
      <AccessTokenProvider>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path='/'>
                <AsyncWeather />
              </Route>
              <Route exact path='/news'>
                <AsyncNews />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/oauth2callback'>
                <Oauth2Callback />
              </Route>
              <Route exact path='/toptens'>
                <AsyncTopTens />
              </Route>
              <Route exact path='/toptens/:id'>
                <AsyncTopTenPlace />
              </Route>
              <Route exact path='*'>
                <AsyncError />
              </Route>
            </Switch>
          </Suspense>
        </Layout>
      </AccessTokenProvider>
    </WeatherProvider>
  </Router>
);

export default App;
