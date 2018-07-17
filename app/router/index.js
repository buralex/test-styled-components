
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir,
    userIsAdminRedir,
    userIsAuthenticated, userIsNotAuthenticated,
} from 'auth'

import LoginComponent from 'containers/Login';
import AboutComponent from 'containers/About/Loadable';
import ServicesComponent from 'containers/Services/Loadable';
import NotFoundPageComponent from 'containers/NotFoundPage';

const Login = userIsNotAuthenticatedRedir(LoginComponent);
const About = AboutComponent;
const Services = userIsAuthenticatedRedir(ServicesComponent);
const NotFoundPage = userIsAuthenticatedRedir(NotFoundPageComponent);

// const Login = LoginComponent;
// const About = AboutComponent;
// const Services = ServicesComponent;
// const NotFoundPage = NotFoundPageComponent;

//const Aaa = userIsAuthenticated(({ logout }) => <a href="#" onClick={() => logout()}>Logout</a>)
//
// console.log(userIsAuthenticated(<div>aaaaaaaassssssddddddddd</div>));

const Router = () => (
    <Switch>
        <Route exact path="/" component={About}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/services/:action?/:id?" component={Services}/>
        <Route exact path="/login" component={Login}/>
        <Route path="" component={NotFoundPage}/>
    </Switch>
);

export default Router;

