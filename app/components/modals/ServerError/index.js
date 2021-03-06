import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import {
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Tooltip, UncontrolledTooltip
} from 'reactstrap';


export const ServerError = ({onClose, footerActions, data, isOpen, destroy}) => {

    const {message, description, details} = data;

    return (
        <Fragment>
            <Modal isOpen={isOpen} className="modal-danger" backdrop="static" onClosed={destroy}>
                <ModalHeader toggle={onClose}>
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
                    <Button
                        key='no'
                        color="primary"
                        onClick={footerActions.BTN_OK}
                    >
                        Ok
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

