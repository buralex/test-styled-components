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
import * as appEventTypes from 'containers/App/constants/appEventTypes';

const ErrorModalEvents = eventHandler();
const SuccessModalEvents = eventHandler();


class ErrorSuccessListener extends React.PureComponent {

    componentDidUpdate(prevProps) {
        this.onUpdate(prevProps);
    }

    onUpdate = (prevProps) => {
        const {error, success} = this.props;

        if (!prevProps.error && error) {
            this.showErrorModal(error);
        }
        if (!prevProps.success && success) {
            this.showSuccessModal(success);
        }
    }

    showErrorModal = (data) => {
        console.log('ERROR LISTENER CONTANER >>>');
        console.log(data);
        console.log(data.message);

        this.props.createSignal({
            type: SignalTypes.OK,
            eventHandler: ErrorModalEvents,
            //appEvent: data.appEvent,
            // title: `Error: ${data.message || ''}`,
            // message: data.description || 'Sorry, try later.',
            // className: 'modal-danger',
            // appEvent: data.appEvent,
            modalData: data.data,
        })
    };

    showSuccessModal = (data) => {
        console.info('SUCCESS LISTENER CONTANER >>>');
        console.log(data);
        this.props.createSignal({
            type: SignalTypes.OK,
            eventHandler: SuccessModalEvents,
            title: `Success`,
            message: data.message || '',
            className: 'modal-success',
            appEvent: data.appEvent,
            modalData: data,
        })
    };

    render() {
        const {loading} = this.props;
        console.log('---------------- RENDER LISTENER >>>>>>>>>>>>>>>>>>>>> -------------------', this.props);

        return (
            <div>
                <ErrorModalEvents
                    onOk={this.props.clearError}
                    onClose={this.props.clearError}
                />
                <SuccessModalEvents
                    onOk={this.props.clearSuccess}
                    onClose={this.props.clearSuccess}
                />
            </div>
        );
    }
}

ErrorSuccessListener.propTypes = {
    // loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    success: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export const mapDispatchToProps = (dispatch) => ({
    clearError: () => dispatch(appAactions.clearError()),
    clearSuccess: () => dispatch(appAactions.clearSuccess()),
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
)(ErrorSuccessListener);
