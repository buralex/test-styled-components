import React from 'react'
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


const ParseError = ({ data: {description, details}}) => (
    <div>
        <h5>{description}</h5>

        {details && details.length &&
            <div>
                Details:
                <ul>
                    {details.map((elem, i) => <div key={`err_ell_${i+1}`}>{elem.description}</div>)}
                </ul>
            </div>
        }
    </div>
)

const SignalContainer = ({ event, destroy, close, modal }) => {
    // modal contains all the properties you submit when calling `createSignal`, so you have all the freedom
    // to do whatever you want (title, message, isRequired) only isFirst and isVisible are required.

    return (
        <div>
            <Modal isOpen={modal.isVisible} className={modal.className} backdrop="static" onClosed={destroy}>
                <ModalHeader
                    toggle={() => {
                        event(modal, SignalEvents.CLOSE);
                        close();
                    }}
                >
                    {modal.title}
                </ModalHeader>

                <ModalBody>
                    {modal.modalType === 'error' &&
                        <ParseError data={modal.modalData} />
                    }
                    {modal.modalType === 'success' &&
                        modal.message
                    }
                </ModalBody>

                <ModalFooter>
                    {getFooter(modal, eventType => event(modal, eventType))}
                </ModalFooter>
            </Modal>
        </div>
    )
}

SignalContainer.propTypes = {
    event: PropTypes.func,
    destroy: PropTypes.func,
    close: PropTypes.func,
    modal: PropTypes.object,
}

function getModalLabel(modal, labelType, otherwise) {
    return (modal.labels && modal.labels[labelType]) || <span>{otherwise}</span>
}

function getFooter(modal, onModalEvent) {
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
    }

    return null
}

export default createContainer(SignalContainer)
