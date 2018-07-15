/**
 * Listener for modal events (works with app state)
 */

import React from 'react';

import {createStructuredSelector} from 'reselect';
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";

import {
    makeSelectError,
    makeSelectSuccess,
} from "containers/App/selectors";

import {
    withSignal,
    // withSignalPropTypes,
    SignalTypes,
    eventHandler,
} from 'redux-signal'

import * as appAactions from "containers/App/actions";


class SignalListener extends React.PureComponent {

    componentDidUpdate() {
        const {error, success} = this.props;

        if (error) {
            this.showErrorModal(error);
            this.props.clearServerError();
        }
        if (success) {
            this.showSuccessModal(success);
            this.props.clearServerSuccess();
        }
    }

    showErrorModal = (error) => {
        console.error('ERROR LISTENER CONTANER >>>');
        console.error(error);
        console.error(error.message);

        this.props.createSignal({
            type: SignalTypes.OK,
            title: `Error: ${error.message || ''}`,
            message: error.description || 'Sorry, try later.',
            className: 'modal-danger',
            modalType: 'error',
            modalData: error,
        })
    };

    showSuccessModal = (data) => {
        console.info('SUCCESS LISTENER CONTANER >>>');
        console.log(data);
        this.props.createSignal({
            // type: SignalTypes.OK,
            // title: `Error: ${error.message || ''}`,
            // message: error.description || 'Sorry, try later.',
            // className: 'modal-danger',
            // modalType: 'error',
            // modalData: error,
            type: SignalTypes.OK,
            title: `Success`,
            message: data.message || '',
            className: 'modal-success',
            modalType: 'success',
            modalData: data,
        })
    };

    render() {
        const {loading} = this.props;
        console.log('---------------- RENDER LISTENER >>>>>>>>>>>>>>>>>>>>> -------------------', this.props);

        return null
    }
}

SignalListener.propTypes = {
    // loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    success: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export const mapDispatchToProps = (dispatch) => ({
    clearServerError: () => dispatch(appAactions.clearServerError()),
    clearServerSuccess: () => dispatch(appAactions.clearServerSuccess()),
});

const mapStateToProps = createStructuredSelector({
    error: makeSelectError(),
    success: makeSelectSuccess(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withSignal,
    withConnect,
)(SignalListener);
