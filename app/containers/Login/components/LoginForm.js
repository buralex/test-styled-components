import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextInput from 'components/Form/TextInput';
import LoadingBeat from 'components/LoadingBeat';

import {
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Tooltip, UncontrolledTooltip
} from 'reactstrap';

const validate = values => {
    const errors = {}

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    return errors
}


const LoginForm = props => {
    const { handleSubmit, pristine, reset, submitting, loading } = props;
    console.log('render login form!!!!!!!!!!1');
    return (
        <form onSubmit={handleSubmit} className="form-content-small">
            <Field name="email" type="email" component={TextInput} label="Email" />
            <Field name="password" type="password" component={TextInput} label="Password" />

            <Button color="success" size="md" type="submit" disabled={submitting || loading} block>
                Submit
            </Button>
            <LoadingBeat loading={loading} />
        </form>
    )
}

export default reduxForm({
    form: 'LoginForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
})(LoginForm)
