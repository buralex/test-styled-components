/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import {withRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';



import Header from 'layout/Header';
import Footer from 'layout/Footer';

import LoadingIndicator from 'components/LoadingIndicator';

import {compose} from "redux";
import {
    makeSelectError,
    makeSelectLoading,
    makeSelectRepos,
    makeSelectIsLoggedIn,
    selectGlobal
} from "containers/App/selectors";
import * as actions from "./actions";
import injectSaga from "utils/injectSaga";
import Router from "router";
import {createSelector, createStructuredSelector} from "reselect";


import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    withSignal,
    // withSignalPropTypes,
    SignalTypes,
    eventHandler,
} from 'reduxSignal'

import saga from './saga';
import * as appActions from "containers/App/actions";


const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class App extends React.PureComponent {


    componentDidUpdate() {
        const {error} = this.props;

        if (error) {
            this.showErrorModal(error);
            this.props.clearServerError();
        }
    }

    showErrorModal = (error) => {
        console.error('ERROR APP CONTANER >>>');
        console.error(error);
        console.error(error.message);

        this.props.createSignal({
            type: SignalTypes.OK,
            title: `Error: ${error.message || ''}`,
            message: error.description || 'Sorry, try later.',
            className: 'modal-danger',
        })
    };

    render() {
        const {isLoggedIn, loading} = this.props;
        console.log('---------------- RENDER APP -------------------', this.props);



        return (
            <AppWrapper>
                <Helmet
                    titleTemplate="Denteez"
                    defaultTitle="Denteez"
                >
                    <meta name="description" content="Denteez"/>
                </Helmet>

                {isLoggedIn && <Header/>}

                <Router />

                {isLoggedIn && <Footer/>}

                {loading && <LoadingIndicator />}
            </AppWrapper>
        );
    }
}

App.propTypes = {
    loading: PropTypes.bool,
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

const selectState = state => state;
const makeSelectState = () =>
    createSelector(selectState, state => state);

const selectSignal = state => state.get('signal');
const makeSelectSignal = () =>
    createSelector(selectSignal, signalState => signalState.get('signal'));


const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
    isLoggedIn: makeSelectIsLoggedIn(),
    //state: makeSelectState(),
    //signal: makeSelectSignal(),
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
    withSignal,
)(App);
