import React, {Fragment} from 'react'

import {
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

const ServerSuccess = ({onClose, footerActions, data, isOpen, destroy}) => {

    const {message} = data;

    return (
        <Fragment>
            <Modal isOpen={isOpen} className="modal-success" backdrop="static" onClosed={destroy}>
                <ModalHeader toggle={onClose}>
                    Success
                </ModalHeader>

                <ModalBody>
                    <div>
                        <h5>{message || 'Ok!'}</h5>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button
                        key='no'
                        color="success"
                        onClick={footerActions.BTN_OK}
                    >
                        Ok
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}
export default ServerSuccess;
