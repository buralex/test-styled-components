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
import {Switch, Route, withRouter} from 'react-router-dom';

import Login from 'containers/Login/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import Enquiry from 'containers/Enquiry/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'layout/Header';
import Footer from 'layout/Footer';
import {loadRepos} from "containers/App/actions";
import {compose} from "redux";
import {
    makeSelectError,
    makeSelectLoading,
    makeSelectRepos,
    makeSelectIsLoggedIn,
    selectGlobal
} from "containers/App/selectors";
import {changeUsername} from "containers/Enquiry/actions";
import injectSaga from "utils/injectSaga";
import {createSelector, createStructuredSelector} from "reselect";

import {makeSelectUsername} from "containers/Enquiry/selectors";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import saga from './saga';


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
    console.log('RENDER APP', props);
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
                <Route exact path="/enquiry" component={Enquiry}/>
                {/*<Route exact path="/service-categories" component={ServiceCategories}/>*/}
                <Route exact path="/login" component={Login}/>
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
//export default App;

export function mapDispatchToProps(dispatch) {
    return {
        onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
        onSubmitForm: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadRepos());
        },
    };
}

const selectState = state => state;
const makeSelectState = () =>
    createSelector(selectState, state => state);

const selectSignal = state => state.get('signal');
const makeSelectSignal = () =>
    createSelector(selectSignal, signalState => signalState.get('signal'));

// var getSignal = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(function (state) {
//     return state.signal.get('signal');
// }, function (signal) {
//     return signal.get('order').map(function (id) {
//         return signal.getIn(['data', id]);
//     });
// });

const mapStateToProps = createStructuredSelector({
    repos: makeSelectRepos(),
    username: makeSelectUsername(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    isLoggedIn: makeSelectIsLoggedIn(),
    state: makeSelectState(),
    signal: makeSelectSignal(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withSaga = injectSaga({key: 'global', saga});

export default compose(
    withSaga,
    withRouter,
    withConnect,
)(App);
