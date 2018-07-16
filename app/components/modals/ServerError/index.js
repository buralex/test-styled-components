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

import appEventTypes from 'containers/App/constants/appEventTypes';
import {getFooter} from 'containers/SignalContainer/index';


export const ServerError = ({signalProps: {event, destroy, close, modal}}) => {

    const {modalData: { message, description, details }} = modal;

    return (
        <Fragment>
            <Modal isOpen={modal.isVisible} className="modal-danger" backdrop="static" onClosed={destroy}>
                <ModalHeader
                    toggle={() => {
                        event(modal, SignalEvents.CLOSE);
                        close();
                    }}
                >
                    {`Error: ${message || ''}`}
                </ModalHeader>

                <ModalBody>
                    <div>
                        <h5>{description || 'Sorry, try later.'}</h5>

                        {details && details.length &&
                        <div>
                            Details:
                            <ul>
                                {details.map((elem, i) => <div key={`err_ell_${i+1}`}>{elem.description}</div>)}
                            </ul>
                        </div>
                        }
                    </div>
                </ModalBody>

                <ModalFooter>
                    {getFooter(modal, eventType => event(modal, eventType))}
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

