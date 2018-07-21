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
                <h6 className="mb-2 text-pinkish-grey">Fields marked “*” are required</h6>

                <Field
                    name={db.enquiry_type}
                    component={Select}
                    options={enquiryTypes.map((elem) => ({label: elem.name, value: elem.name}))}
                    label="Enquiry Type *"
                    onChange={(event, value) => {
                        change(db.other_enquiry_type, '');
                    }}
                />

                {isEnqTypeOther &&
                <Field
                    name={db.other_enquiry_type}
                    component={TextInput}
                    placeholder="Other"
                    className="other-enquiry"
                />
                }

                <div className="row">
                    <div className="col-6">
                        <Field
                            name={db.user_name}
                            component={TextInput}
                            label="Name *"
                        />
                    </div>
                    <div className="col-6">
                        <Field
                            name={db.email}
                            component={TextInput}
                            type="email"
                            label="Email"
                        />
                    </div>
                </div>

                <Field
                    name={db.subject}
                    component={TextInput}
                    label="Subject *"
                />

                <div >
                    <Field
                        name={db.description}
                        component={TextArea}
                        label="Description *"
                        maxlength={1000}
                        className="description"
                    />
                </div>


                <div className="">
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

                <div className="absolute-left w-100">
                    <LoadingBeat loading={loading} />
                </div>
            </div>

            <div className="form-footer">
                <Button color="success" size="lg" type="submit" disabled={submitting || loading} block>
                    Submit
                </Button>
            </div>

        </form>
    )
}

export default reduxForm({
    form: 'SupportForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
})(SupportForm)
