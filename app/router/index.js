
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir,
    userIsAdminRedir,
    userIsAuthenticated, userIsNotAuthenticated,
} from 'auth'

import LoginComponent from 'containers/Login';
import EnquiryComponent from 'containers/Enquiry/Loadable';
import ServicesComponent from 'containers/Services/Loadable';
import NotFoundPageComponent from 'containers/NotFoundPage';

// const Login = userIsNotAuthenticatedRedir(LoginComponent);
// const Enquiry = userIsNotAuthenticatedRedir(EnquiryComponent);
// const Services = userIsAuthenticatedRedir(ServicesComponent);
// const NotFoundPage = userIsAuthenticatedRedir(NotFoundPageComponent);

const Login = LoginComponent;
const Enquiry = EnquiryComponent;
const Services = ServicesComponent;
const NotFoundPage = NotFoundPageComponent;

//const Aaa = userIsAuthenticated(({ logout }) => <a href="#" onClick={() => logout()}>Logout</a>)
//
// console.log(userIsAuthenticated(<div>aaaaaaaassssssddddddddd</div>));

const Router = () => (
    <Switch>
        <Route exact path="/" component={Enquiry}/>
        <Route exact path="/enquiry" component={Enquiry}/>
        <Route exact path="/services" component={Services}/>
        <Route exact path="/login" component={Login}/>
        <Route path="" component={NotFoundPage}/>
    </Switch>
);

export default Router;

