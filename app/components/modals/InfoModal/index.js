import React, {Fragment} from 'react'


import {
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';


const InfoModal = ({onClose, footerActions, data, isOpen, destroy}) => {

    const {message, description, details} = data;

    return (
        <Fragment>
            <Modal isOpen={isOpen} backdrop="static" onClosed={destroy}>
                <ModalHeader toggle={onClose}>
                    {`Info: ${message}`}
                </ModalHeader>

                <ModalBody>
                    <div>
                        <h5>{description || 'Some info...'}</h5>

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

            </Modal>
        </Fragment>
    )
}
export default InfoModal;

