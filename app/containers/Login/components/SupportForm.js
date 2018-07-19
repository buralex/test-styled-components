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


import {FIELDS as db} from '../constants/fields';
import validate from './validation';



const SupportForm = props => {
    const {
        handleSubmit, pristine, reset, submitting, change, form, enquiryTypes, isEnqTypeOther, loading,
    } = props;

    return (
        <form onSubmit={handleSubmit} className="form-small">
            <div className="form-body">
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

                <Field
                    name={db.file}
                    component={FileUpload}
                    placeholder={{
                        header: 'Add photo',
                        text: 'Minimum size of 300x300 jpeg jpg png 5 MB',
                    }}
                    validateImgSize={{minWidth: 300, minHeight: 300}}
                />
            </div>

            <div className="form-footer">
                <Button color="success" size="lg" type="submit" disabled={submitting || loading} block>
                    Submit
                </Button>
            </div>


            <div className="position-absolute w-100">
                <LoadingBeat loading={loading} />
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'SupportForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
})(SupportForm)