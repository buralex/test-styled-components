import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import Dropzone from 'react-dropzone';

import TextInput from 'components/Form/TextInput';
import TextArea from 'components/Form/TextArea';
import Select from 'components/Form/Select';


import {FIELDS as db} from '../constants/fields';

const validate = values => {
    const errors = {}

    if (!values.get(db.enquiry_type)) {
        errors.enquiry_type = 'Required'
    }

    if (!values.get(db.description)) {
        errors.description = 'Required'
    }

    if (!values.get(db.subject)) {
        errors.subject = 'Required'
    }

    if (!values.get(db.user_name)) {
        errors.user_name = 'Required'
    } else if (values.get(db.user_name) && /[^a-zA-Z0-9 ]/i.test(values.get(db.user_name))) {
        errors.user_name = 'Only alphanumeric characters'
    } else if (values.get(db.user_name).length > 15) {
        errors.user_name = 'Must be 15 characters or less'
    }

    if (!values.get(db.email)) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.get(db.email))) {
        errors.email = 'Invalid email address'
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
                options={enquiryTypes.map((elem) => ({label: elem.get('name'), value: elem.get('name')}))}
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
