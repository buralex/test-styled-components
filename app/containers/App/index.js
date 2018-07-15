/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import {Helmet} from 'react-helmet';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {createStructuredSelector} from 'reselect';
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";

import injectSaga from 'utils/injectSaga';



import {
    makeSelectError,
    makeSelectLoading,
    makeSelectRepos,
    makeSelectIsLoggedIn,
    selectApp
} from "containers/App/selectors";

import {
    withSignal,
    // withSignalPropTypes,
    SignalTypes,
    eventHandler,
} from 'redux-signal'

import Header from 'layout/Header';
import Footer from 'layout/Footer';


import SignalListener from 'containers/SignalListener';


import SignalContainer from 'containers/SignalContainer';
import Router from "router";

import saga from './saga';
import * as actions from "./actions";



class App extends React.PureComponent {

    render() {
        const {isLoggedIn, loading} = this.props;
        console.log('---------------- RENDER APP -------------------', this.props);


        console.log(loading);
        return (
            <div>
                <Helmet
                    titleTemplate="Denteez"
                    defaultTitle="Denteez"
                >
                    <meta name="description" content="Denteez"/>
                </Helmet>

                {isLoggedIn && <Header/>}

                <div className="container-fluid">
                    <div className="row">
                        <Router />
                    </div>
                </div>

                {isLoggedIn && <Footer/>}

                <SignalListener />
                <SignalContainer />
            </div>
        );
    }
}

App.propTypes = {
    // loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    // onSubmitForm: PropTypes.func,
    // username: PropTypes.string,
    // onChangeUsername: PropTypes.func,
    isLoggedIn: PropTypes.bool,
};

export const mapDispatchToProps = (dispatch) => ({
    clearServerError: () => dispatch(actions.clearServerError()),
});

const mapStateToProps = createStructuredSelector({
    // loading: makeSelectLoading(),
    // error: makeSelectError(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withSaga = injectSaga({key: 'app', saga});

export default compose(
    withRouter,
    withSaga,
    withConnect,
)(App);
