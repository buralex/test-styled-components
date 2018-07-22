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
    makeSelectIsLoggedIn,
    makeSelectIsLogin,
    makeSelectAlert,
} from "containers/App/selectors";

import {
    withSignal,
    // withSignalPropTypes,
    SignalTypes,
    eventHandler,
} from 'redux-signal'

import NavBar from 'layout/NavBar';
import Footer from 'layout/Footer';
import LeftBar from 'layout/LeftBar';
import RightBar from 'layout/RightBar';


import SignalContainer from 'containers/SignalContainer/index';
import Router from "router";

import saga from './saga';
import * as actions from "./actions";

const AlertModalEvents = eventHandler();

class App extends React.PureComponent {

    componentDidUpdate(prevProps) {
        this.onUpdate(prevProps);
    }

    onUpdate = (prevProps) => {
        const {alert} = this.props;

        if (!prevProps.alert && alert) {
            this.showAlertModal(alert);
        }
    }

    showAlertModal = (alert) => {
        this.props.createSignal({
            type: SignalTypes.OK,
            eventHandler: AlertModalEvents,
            modalData: alert.data,
            modalName: alert.modalName,
        })
    };


    render() {
        const {isLoggedIn, isLoginPage, loading} = this.props;
        console.log('---------------- RENDER APP -------------------', this.props);


        console.log(loading);
        console.log(isLoginPage);
        return (
            <div className="app-wrapper">
                <Helmet
                    titleTemplate="Denteez"
                    defaultTitle="Denteez"
                >
                    <meta name="description" content="Denteez"/>
                </Helmet>

                {isLoggedIn && !isLoginPage && <NavBar/>}

                <div className={isLoginPage ? '' : 'd-flex max-width justify-content-between' }>
                    {isLoggedIn && !isLoginPage && <LeftBar/>}

                    <div className="center-column">
                        <div className="container-fluid ">
                            <Router />
                        </div>
                    </div>


                    {isLoggedIn && !isLoginPage && <RightBar/>}
                </div>

                {isLoginPage && <Footer showAlert={this.props.showAlert} />}

                <AlertModalEvents
                    onOk={this.props.hideAlert}
                    onClose={this.props.hideAlert}
                />
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
    hideAlert: () => dispatch(actions.hideAlert()),
    showAlert: (modalName, data) => dispatch(actions.showAlert(modalName, data)),
});

const mapStateToProps = createStructuredSelector({
    isLoggedIn: makeSelectIsLoggedIn(),
    isLoginPage: makeSelectIsLogin(),
    alert: makeSelectAlert(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withSaga = injectSaga({key: 'app', saga});

export default compose(
    withRouter,
    withSaga,
    withSignal,
    withConnect,
)(App);
