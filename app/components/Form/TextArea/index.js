
import React from 'react'
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const TextArea = ({
    input, placeholder, label, type, meta: {touched, error}, meta, maxlength, showValid, validText,
}) => {

    const isInvalid = Boolean(touched && error);
    const isValid = Boolean(touched && !error);
    const idStr = `${meta.form}_${input.name}`;

    return (
        <FormGroup>
            <Label for={idStr}> {label} </Label>
            {maxlength &&
                <span className="textarea-max-length float-right">{`(0/${maxlength - input.value.length})`}</span>
            }
            <Input
                id={idStr}
                {...input}
                placeholder={placeholder}
                type={type || "textarea"}
                invalid={isInvalid}
                valid={showValid && isValid}
                maxLength={maxlength}
            />
            {isInvalid && <FormFeedback>{error}</FormFeedback>}
            {isValid && showValid && <FormFeedback valid>{validText}</FormFeedback>}
        </FormGroup>
    )
};

TextArea.propTypes = {
    input: PropTypes.object.isRequired,
};

export default TextArea;
