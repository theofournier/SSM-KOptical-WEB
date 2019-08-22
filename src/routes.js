import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import Main from './components/main/Main';
import Login from './components/login/Login';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import Settings from './components/settings/Settings';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <PrivateRoute exact path="/settings" component={Settings} />
      <Route exact />
    </Switch>
  );
};

export default Routes;
