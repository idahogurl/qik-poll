import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexScreen from './screens/Index';
import NotFoundComponent from './components/NotFoundComponent';

const routes = (
  <Switch>
    <Route path="/" component={IndexScreen} />
    <Route component={NotFoundComponent} />
  </Switch>
);

export default routes;
