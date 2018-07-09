import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import InputText from 'components/Form/InputText';

const validate = values => {
    const errors = {}
    if (!values.get('username')) {
        errors.username = 'Required'
    } else if (values.get('username') && /[^a-zA-Z0-9 ]/i.test(values.get('username'))) {
        errors.username = 'Only alphanumeric characters'
    }else if (values.get('username').length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!values.get('email')) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.get('email'))) {
        errors.email = 'Invalid email address'
    }
    if (!values.get('age')) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.get('age')))) {
        errors.age = 'Must be a number'
    } else if (Number(values.get('age')) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors
}




const EnquiryForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="enquiryText"
                type="textarea"
                component={InputText}
                label="Description *"
                maxlength={1000}
            />
            <Field
                name="username"
                type="text"
                component={InputText}
                label="Username *"
            />
            <Field name="email" type="email" component={InputText} label="Email" />
            <Field name="age" type="number" component={InputText} label="Age" />
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
    form: 'EnquiryForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
})(EnquiryForm)
