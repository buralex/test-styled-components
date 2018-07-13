
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir,
    userIsAdminRedir,
    userIsAuthenticated, userIsNotAuthenticated,
} from 'auth'

import LoginComponent from 'containers/Login/Loadable';
import EnquiryComponent from 'containers/Enquiry/Loadable';
import ServiceCategoriesComponent from 'containers/ServiceCategories';
import NotFoundPageComponent from 'containers/NotFoundPage/Loadable';

// const Login = userIsNotAuthenticatedRedir(LoginComponent);
// const Enquiry = userIsAuthenticatedRedir(EnquiryComponent);
// const ServiceCategories = userIsAuthenticatedRedir(ServiceCategoriesComponent);
// const NotFoundPage = userIsAuthenticatedRedir(NotFoundPageComponent);

const Login = LoginComponent;
const Enquiry = EnquiryComponent;
const ServiceCategories = ServiceCategoriesComponent;
const NotFoundPage = NotFoundPageComponent;

//const Aaa = userIsAuthenticated(({ logout }) => <a href="#" onClick={() => logout()}>Logout</a>)
//
// console.log(userIsAuthenticated(<div>aaaaaaaassssssddddddddd</div>));

const Router = () => (
    <Switch>
        {/*<Route exact path="/" component={Enquiry}/>*/}
        {/*<Route exact path="/enquiry" component={Enquiry}/>*/}
        {/*<Route exact path="/service-categories" component={ServiceCategories}/>*/}
        <Route exact path="/login" component={Login}/>
        {/*<Route path="" component={NotFoundPage}/>*/}
    </Switch>
);

export default Router;

