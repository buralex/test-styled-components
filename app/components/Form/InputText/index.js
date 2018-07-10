
import React from 'react'
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const InputText = ({
    input, placeholder, label, type, meta: {touched, error}, meta, maxlength, showValid, validText,
}) => {

    const isInvalid = Boolean(touched && error);
    const isValid = Boolean(touched && !error);
    const idStr = `${meta.form}_${input.name}`;
    const isTextArea = type === 'textarea';

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
                invalid={isInvalid}
                valid={showValid && isValid}
                maxLength={maxlength}
            />
            {isInvalid && <FormFeedback>{error}</FormFeedback>}
            {isValid && showValid && <FormFeedback valid>{validText}</FormFeedback>}
        </FormGroup>
    )
};

InputText.propTypes = {
    input: PropTypes.object.isRequired,
};

export default InputText;
