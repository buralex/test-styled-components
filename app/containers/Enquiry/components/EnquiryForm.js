import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

const validate = values => {
    const errors = {}
    if (!values.get('username')) {
        errors.username = 'Required'
    } else if (values.get('username').length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!values.get('email')) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
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

const warn = values => {
    const warnings = {}
    if (values.get('username') && /[^a-zA-Z0-9 ]/i.test(values.get('username'))) {
        warnings.username = 'Only alphanumeric characters'
    }
    if (values.get('age') < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}



const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
}) => {

    const invalid = Boolean(touched && error);

    console.log('v', invalid);
    return (
        <div>
            <label>{label}</label>
            <div>
                {/*<input {...input} placeholder={label} type={type} />*/}
                {/*<FormGroup>*/}
                {/*<Label for="exampleEmail">Valid input</Label>*/}
                {/*<Input {...input} placeholder={label} type={type} valid/>*/}
                {/*<FormFeedback valid={error}>Sweet! that name is available</FormFeedback>*/}
                {/*</FormGroup>*/}



                <FormGroup>
                    <Label for="exampleEmail">Valid input</Label>
                    <Input
                        {...input}
                        placeholder={label}
                        type={type}
                        invalid={invalid}
                    />
                    <FormFeedback invalid={invalid}>{error}</FormFeedback>
                </FormGroup>

                {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
            </div>
        </div>
    )
}

const EnquiryForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="username"
                type="text"
                component={renderField}
                label="Username"
            />
            <Field name="email" type="email" component={renderField} label="Email" />
            <Field name="age" type="number" component={renderField} label="Age" />
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
    warn, // <--- warning function given to redux-form
})(EnquiryForm)
