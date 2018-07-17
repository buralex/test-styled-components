import React from 'react'
import { Field, reduxForm } from 'redux-form'


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

//import {FIELDS as db} from '../constants/fields';
//import validate from './validation';




const submit = (values) => {
    console.log(values);
    return () => values;
}

const SearchForm = props => {
    const {
        handleSubmit, pristine, reset, submitting, change, form, enquiryTypes, isEnqTypeOther, loading,
    } = props;

    const beforeSubmit = (values) => {
        props.onSubmit(trimFields(values))
    }

    return (
        <form onSubmit={handleSubmit(beforeSubmit)} className="form-content-small">

            <Field
                name="query"
                component={TextInput}
            />

            <Button color="success" size="md" type="submit" disabled={submitting || loading} block>
                search
            </Button>
            <LoadingBeat loading={loading} />
        </form>
    )
}

export default reduxForm({

})(SearchForm)
