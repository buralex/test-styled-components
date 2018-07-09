
import React from 'react'
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const InputText = ({input, placeholder, label, type, meta: {touched, error}, meta, maxlength}) => {

    const invalid = Boolean(touched && error);
    const idStr = `${meta.form}_${input.name}`;
    const isTextArea = type === 'textarea';
    console.log(input.value.length);
    console.log(isTextArea);
    console.log(maxlength);
    return (
        <FormGroup>

            <Label for={idStr}> {label} </Label>
            {isTextArea && maxlength &&
            <span className="textarea-max-length float-right">{`(0/${maxlength - input.value.length})`}</span>
            }
            <Input
                id={idStr}
                {...input}
                placeholder={placeholder}
                type={type}
                invalid={invalid}
                maxLength={maxlength}
            />
            <FormFeedback invalid={invalid.toString()}>{error}</FormFeedback>
        </FormGroup>
    )
};

InputText.propTypes = {
    input: PropTypes.object.isRequired,
};

export default InputText;
