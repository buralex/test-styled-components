import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import {
    createContainer,
    SignalEvents,
    SignalTypes,
} from 'redux-signal'


import * as modalNames from 'components/modals/names';

import ServerError from 'components/modals/ServerError';
import ServerSuccess from 'components/modals/ServerSuccess';
import InfoModal from 'components/modals/InfoModal';


const SignalContainer = ({event, destroy, close, modal}) => {
    // modal contains all the properties you submit when calling `createSignal`, so you have all the freedom
    // to do whatever you want (title, message, isRequired) only isFirst and isVisible are required.

    const {modalName, modalData, isVisible, isFirst} = modal;

    const onClose = () => {
        event(modal, SignalEvents.CLOSE);
        close();
    };

    const footerActions = getFooterActions(modal, eventType => event(modal, eventType));

    let modalComponent;

    switch (modalName) {
        case modalNames.INFO_MODAL:
            modalComponent = (
                <InfoModal
                    isOpen={isVisible}
                    isFirst={isFirst}
                    onClose={onClose}
                    data={modalData}
                    destroy={destroy}
                    footerActions={footerActions}
                />
            );
            break;
        case modalNames.SERVER_ERROR:
            modalComponent = (
                <ServerError
                    isOpen={isVisible}
                    isFirst={isFirst}
                    onClose={onClose}
                    data={modalData}
                    destroy={destroy}
                    footerActions={footerActions}
                />
            );
            break;

        case modalNames.SERVER_SUCCESS:
            modalComponent = (
                <ServerSuccess
                    isOpen={isVisible}
                    isFirst={isFirst}
                    onClose={onClose}
                    data={modalData}
                    destroy={destroy}
                    footerActions={footerActions}
                />
            );
            break;

        default:
            modalComponent = <div>modal</div>;
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

export function getFooterActions(modal, onModalEvent) {
    switch (modal.type) {
        case SignalTypes.YES_NO:
            return {
                [SignalEvents.BTN_YES]: () => onModalEvent(SignalEvents.BTN_YES),
                [SignalEvents.BTN_NO]: () => onModalEvent(SignalEvents.BTN_NO),
            };

        case SignalTypes.YES_NO_CANCEL:
            return {
                [SignalEvents.BTN_YES]: () => onModalEvent(SignalEvents.BTN_YES),
                [SignalEvents.BTN_NO]: () => onModalEvent(SignalEvents.BTN_NO),
                [SignalEvents.BTN_CANCEL]: () => onModalEvent(SignalEvents.BTN_CANCEL),
            };

        case SignalTypes.OK_CANCEL:
            return {
                [SignalEvents.BTN_OK]: () => onModalEvent(SignalEvents.BTN_OK),
                [SignalEvents.BTN_CANCEL]: () => onModalEvent(SignalEvents.BTN_CANCEL),
            };

        case SignalTypes.OK:
            return {
                [SignalEvents.BTN_OK]: () => onModalEvent(SignalEvents.BTN_OK),
            };

        default:
            return null;
    }
}

export default createContainer(SignalContainer);
