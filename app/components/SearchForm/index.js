import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

import {trimFields} from 'functions';

//import {FIELDS as db} from '../constants/fields';
//import validate from './validation';




const submit = (values) => {
    console.log(values);
    return () => values;
}

const SearchForm = props => {
    const {
        handleSubmit, pristine, reset, submitting, change, form, enquiryTypes, isEnqTypeOther, loading,
    } = props;

    const beforeSubmit = (values) => {
        props.onSubmit(trimFields(values))
    }

    return (
        <form onSubmit={handleSubmit(beforeSubmit)} className="form-content-small">
            <div className="position-relative">
                <Field
                    name="query"
                    component={TextInput}
                    placeholder="Search"
                />
                <span className="search-icon">
                    <FontAwesomeIcon icon="search" />
                </span>

            </div>


            {/*<div className="row">*/}
                {/*<div className="col-md-4">*/}
                    {/*<div className="input-group">*/}
                        {/**/}
                        {/*/!*<input className="form-control py-2 border-right-0 border" type="search" value="search"*!/*/}
                               {/*/!*id="example-search-input">*!/*/}
                {/*<span className="input-group-append">*/}
                    {/*<div className="input-group-text bg-transparent"><i className="fa fa-search"></i></div>*/}
                {/*</span>*/}
                    {/*</div>*/}
                {/*</div>*/}
            {/*</div>*/}

            {/*<Button color="success" size="md" type="submit" disabled={submitting || loading} block>*/}
                {/*search*/}
            {/*</Button>*/}
            <LoadingBeat loading={loading} />
        </form>
    )
}

export default reduxForm({

})(SearchForm)
