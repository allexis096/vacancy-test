import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Create from '../pages/Create';
import List from '../pages/List';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/create" component={Create} />
    <Route path="/list" component={List} />
  </Switch>
);

export default Routes;
