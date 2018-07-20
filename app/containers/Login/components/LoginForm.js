import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextInput from 'components/Form/TextInput';
import LoadingBeat from 'components/LoadingBeat';

import { Button } from 'reactstrap';

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

    return (
        <form onSubmit={handleSubmit} className="form-small">

            <div className="form-body">
                <div className="row">
                    <div className="col-6">
                        <Field name="email" type="email" component={TextInput} label="Email" />
                    </div>
                    <div className="col-6">
                        <Field name="password" type="password" component={TextInput} label="Password" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        email:
                        <h5 className="text-danger">test@abz.agency</h5>
                    </div>
                    <div className="col-6">
                        password:
                        <h5 className="text-danger">123456</h5>
                    </div>
                </div>
            </div>

            <div className="form-footer">
                <Button color="success" size="lg" type="submit" disabled={submitting || loading} block>
                    Submit
                </Button>
            </div>


            <div className="position-absolute w-100">
                <LoadingBeat loading={true} />
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'LoginForm',
    validate,
})(LoginForm)
