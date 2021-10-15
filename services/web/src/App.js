import React, { lazy, Suspense } from 'react';

// Libraries
import { Router, Route, Switch } from 'react-router-dom';

// Assets
import history from './utils/createBrowserHistory';

// Lazily Load Pages (Helps with code splitting)
const AsyncWeather = lazy(() => import('./pages/Weather'));
const AsyncError = lazy(() => import('./pages/Error'));

const App = () => (
  <Router history={history}>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path='/'>
          <AsyncWeather />
        </Route>

        <Route exact path='*'>
          <AsyncError />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
