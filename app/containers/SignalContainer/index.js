import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import {
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Tooltip, UncontrolledTooltip
} from 'reactstrap';

import {
    createContainer,
    SignalEvents,
    SignalTypes,
} from 'redux-signal'

import * as appEventTypes from 'containers/App/constants/appEventTypes'

import {ServerError} from 'components/modals/ServerError';
import {ServerSuccess} from 'components/modals/ServerSuccess';


const SignalContainer = (props) => {
    // modal contains all the properties you submit when calling `createSignal`, so you have all the freedom
    // to do whatever you want (title, message, isRequired) only isFirst and isVisible are required.

    const {modal, modal: {appEvent} } = props;

    console.log(modal);
    console.log(appEvent);

    let modalComponent;


    switch (appEvent) {
        case appEventTypes.SERVER_ERROR:
            modalComponent = <ServerError signalProps={props} />;
            break;

        case appEventTypes.SERVER_SUCCESS:
            modalComponent = <ServerSuccess signalProps={props} />;
            break;

        default:
            modalComponent = <ServerSuccess signalProps={props} />;
    }


    return (
        <Fragment>
            {modalComponent}
        </Fragment>
    )
}

SignalContainer.propTypes = {
    event: PropTypes.func,
    destroy: PropTypes.func,
    close: PropTypes.func,
    modal: PropTypes.object,
}

export function getModalLabel(modal, labelType, otherwise) {
    return (modal.labels && modal.labels[labelType]) || <span>{otherwise}</span>
}

export function getFooter(modal, onModalEvent) {
    switch (modal.type) {
        case SignalTypes.YES_NO:
            return [
                <Button
                    key='no'
                    color="primary"
                    onClick={() => onModalEvent(SignalEvents.BTN_NO)}
                >
                    {getModalLabel(modal, 'no', 'Nope')}
                </Button>,
                <Button
                    key='yes'
                    color="secondary"
                    onClick={() => onModalEvent(SignalEvents.BTN_YES)}
                >
                    {getModalLabel(modal, 'yes', 'Yep')}
                </Button>,
            ]
        case SignalTypes.YES_NO_CANCEL:
            return [
                <Button
                    key='cancel'
                    onClick={() => onModalEvent(SignalEvents.BTN_CANCEL)}>
                    {getModalLabel(modal, 'cancel', 'Cancel')}
                </Button>,
                <Button
                    key='no'
                    reject
                    onClick={() => onModalEvent(SignalEvents.BTN_NO)}>
                    {getModalLabel(modal, 'no', 'Nope')}
                </Button>,
                <Button
                    key='yes'
                    reject
                    onClick={() => onModalEvent(SignalEvents.BTN_YES)}>
                    {getModalLabel(modal, 'yes', 'Yep')}
                </Button>,
            ]

        case SignalTypes.OK_CANCEL:
            return [
                <Button
                    key='cancel'
                    onClick={() => onModalEvent(SignalEvents.BTN_CANCEL)}>
                    {getModalLabel(modal, 'cancel', 'Cancel')}
                </Button>,
                <Button
                    key='ok'
                    primary
                    onClick={() => onModalEvent(SignalEvents.BTN_OK)}>
                    {getModalLabel(modal, 'ok', 'Ok')}
                </Button>,
            ]
        case SignalTypes.OK:
            return (
                <Button
                    color="primary"
                    onClick={() => onModalEvent(SignalEvents.BTN_OK)}
                >
                    {getModalLabel(modal, 'ok', 'Ok')}
                </Button>
            )
        default:
            return null;
    }
}

export default createContainer(SignalContainer)
