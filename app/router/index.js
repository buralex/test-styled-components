
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir,
    userIsAdminRedir,
    userIsAuthenticated, userIsNotAuthenticated,
} from 'auth'

import LoginComponent from 'containers/Login/Loadable';
import ServicesComponent from 'containers/Services/Loadable';
import SupportComponent from 'containers/Support/Loadable';
import NotFoundPageComponent from 'containers/NotFoundPage';

const Login = userIsNotAuthenticatedRedir(LoginComponent);

const Services = userIsAuthenticatedRedir(ServicesComponent);
const Support = userIsAuthenticatedRedir(SupportComponent);
const NotFoundPage = userIsAuthenticatedRedir(NotFoundPageComponent);

const Router = () => (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/login/support" component={Login}/>
        <Route exact path="/services/:action?/:id?" component={Services}/>
        <Route exact path="/support" component={Support}/>
        <Route path="" component={NotFoundPage}/>
    </Switch>
);

export default Router;

