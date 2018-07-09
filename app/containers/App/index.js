/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import {Switch, Route} from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import Enquiry from 'containers/Enquiry/Loadable';
import ServiceCategories from 'containers/ServiceCategories/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'layout/Header';
import Footer from 'layout/Footer';
import {loadRepos} from "containers/App/actions";
import saga from "containers/Enquiry/saga";
import reducer from "containers/Enquiry/reducer";
import {compose} from "redux";
import {makeSelectError, makeSelectLoading, makeSelectRepos,
    makeSelectIsLoggedIn} from "containers/App/selectors";
import {changeUsername} from "containers/Enquiry/actions";
import injectSaga from "utils/injectSaga";
import {createStructuredSelector} from "reselect";
import injectReducer from "utils/injectReducer";
import {makeSelectUsername} from "containers/Enquiry/selectors";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const App = (props) => {
    const {isLoggedIn} = props;
    console.log(props);
    return (
        <AppWrapper>
            <Helmet
                titleTemplate="Denteez"
                defaultTitle="Denteez"
            >
                <meta name="description" content="Denteez"/>
            </Helmet>

            {isLoggedIn && <Header/>}

            <Switch>
                <Route exact path="/" component={Enquiry}/>
                {/*<Route exact path="/service-categories" component={ServiceCategories}/>*/}
                <Route exact path="/home" component={HomePage}/>
                <Route path="/features" component={FeaturePage}/>
                <Route path="" component={NotFoundPage}/>
            </Switch>

            {isLoggedIn && <Footer/>}

        </AppWrapper>
    );
}

App.propTypes = {
    // loading: PropTypes.bool,
    // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    // onSubmitForm: PropTypes.func,
    // username: PropTypes.string,
    // onChangeUsername: PropTypes.func,
    isLoggedIn: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
    return {
        onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
        onSubmitForm: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadRepos());
        },
    };
}

const mapStateToProps = createStructuredSelector({
    repos: makeSelectRepos(),
    username: makeSelectUsername(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    isLoggedIn: makeSelectIsLoggedIn(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

//const withReducer = injectReducer({key: 'global', reducer});
//const withSaga = injectSaga({key: 'global', saga});

export default compose(
    //withReducer,
    //withSaga,
    withConnect,
)(App);
