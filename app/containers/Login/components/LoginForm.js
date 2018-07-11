import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import TextInput from 'components/Form/TextInput';

const validate = values => {
    const errors = {}

    if (!values.get('email')) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.get('email'))) {
        errors.email = 'Invalid email address'
    }
    if (!values.get('password')) {
        errors.password = 'Required'
    }
    return errors
}


const LoginForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    console.log('render login form!!!!!!!!!!1');
    return (
        <form onSubmit={handleSubmit}>
            <Field name="email" type="email" component={TextInput} label="Email" />
            <Field name="password" type="password" component={TextInput} label="Password" />
            <div>
                <button type="submit" disabled={submitting}>
                    Submit
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'LoginForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
})(LoginForm)
