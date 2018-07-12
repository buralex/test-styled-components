import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import TextInput from 'components/Form/TextInput';
import TextArea from 'components/Form/TextArea';
import Select from 'components/Form/Select';

const validate = values => {
    const errors = {}
    if (!values.get('username')) {
        errors.username = 'Required'
    } else if (values.get('username') && /[^a-zA-Z0-9 ]/i.test(values.get('username'))) {
        errors.username = 'Only alphanumeric characters'
    } else if (values.get('username').length > 15) {
        errors.username = 'Must be 15 characters or less'
    }

    if (!values.get('email')) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.get('email'))) {
        errors.email = 'Invalid email address'
    }

    if ((values.get('enquiry_type') === 'Other') && (!values.get('other_enquiry_type'))) {
        errors.other_enquiry_type = 'Required'
    }

    return errors;
}


const EnquiryForm = props => {
    const { handleSubmit, pristine, reset, submitting, enquiryTypes, isEnqTypeOther } = props;
    console.log(isEnqTypeOther);
    return (
        <form onSubmit={handleSubmit}>

            <Field
                name="enquiry_type"
                component={Select}
                options={enquiryTypes.map((elem) => ({label: elem.name, value: elem.name}))}
                label="Enquiry type *"
            />

            {isEnqTypeOther &&
                <Field
                    name="other_enquiry_type"
                    component={TextInput}
                    label="Other Enquiry type *"
                />
            }

            <Field
                name="description"
                component={TextArea}
                label="Description *"
                maxlength={1000}
            />
            <Field
                name="subject"
                component={TextInput}
                label="Subject *"
            />
            <Field
                name="user_name"
                component={TextInput}
                label="Username *"
            />
            <Field name="email" type="email" component={TextInput} label="Email" />

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
