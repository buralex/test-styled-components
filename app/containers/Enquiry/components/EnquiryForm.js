import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Dropzone from 'react-dropzone';

import TextInput from 'components/Form/TextInput';
import TextArea from 'components/Form/TextArea';
import Select from 'components/Form/Select';


import {FIELDS as db} from '../constants/fields';

const validate = values => {
    const errors = {}

    if (!values[db.enquiry_type]) {
        errors[db.enquiry_type] = 'Required'
    }

    if (!values[db.description]) {
        errors[db.description] = 'Required'
    }

    if (!values[db.subject]) {
        errors[db.subject] = 'Required'
    }

    if (!values[db.user_name]) {
        errors[db.user_name] = 'Required'
    } else if (values[db.user_name] && /[^a-zA-Z0-9 ]/i.test(values[db.user_name])) {
        errors[db.user_name] = 'Only alphanumeric characters'
    } else if (values[db.user_name].length > 15) {
        errors[db.user_name] = 'Must be 15 characters or less'
    }

    if (!values[db.email]) {
        errors[db.email] = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values[db.email])) {
        errors[db.email] = 'Invalid email address'
    }

    return errors;
}

const renderDropzoneInput = (field) => {
    const files = field.input.value;
    return (
        <div>
            <Dropzone
                name={field.name}
                onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
            >
                <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
                <ul>
                    { files.map((file, i) => <li key={i}>{file.name}</li>) }
                </ul>
            )}
        </div>
    );
}


const EnquiryForm = props => {
    const { handleSubmit, pristine, reset, submitting, change, form, enquiryTypes, isEnqTypeOther } = props;

    return (
        <form onSubmit={handleSubmit}>

            <Field
                name={db.file}
                component={renderDropzoneInput}
            />

            <Field
                name={db.enquiry_type}
                component={Select}
                options={enquiryTypes.map((elem) => ({label: elem.name, value: elem.name}))}
                label="Enquiry type *"
                onChange={(event, value) => {
                    change(db.other_enquiry_type, '');
                }}
            />

            {isEnqTypeOther &&
                <Field
                    name={db.other_enquiry_type}
                    component={TextInput}
                    placeholder="Other"
                />
            }
            <Field
                name={db.description}
                component={TextArea}
                label="Description *"
                maxlength={1000}
            />
            <Field
                name={db.subject}
                component={TextInput}
                label="Subject *"
            />
            <Field
                name={db.user_name}
                component={TextInput}
                label="Username *"
            />
            <Field
                name={db.email}
                component={TextInput}
                type="email"
                label="Email"
            />

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
