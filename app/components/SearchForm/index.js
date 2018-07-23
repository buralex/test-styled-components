import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TextInput from 'components/Form/TextInput';
import TextArea from 'components/Form/TextArea';
import Select from 'components/Form/Select';
import FileUpload from 'components/Form/FileUpload';
import LoadingBeat from 'components/LoadingBeat';

import {
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Tooltip, UncontrolledTooltip
} from 'reactstrap';

import {trimFields} from 'functions';


const SearchForm = props => {
    const {
        handleSubmit, form, placeholder,
    } = props;

    const beforeSubmit = (values) => {
        props.onSubmit(trimFields(values))
    }

    return (
        <form onSubmit={handleSubmit(beforeSubmit)} className="form-content-small">
            <div className="position-relative">
                <Field
                    name="query"
                    component={TextInput}
                    placeholder={placeholder}
                />
            </div>
        </form>
    )
}

export default reduxForm({

})(SearchForm)
