
import React from 'react'
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const TextInput = ({
    input, placeholder, label, type, meta: {touched, error}, meta,
    showValid, validText, size, className,
}) => {

    const isInvalid = Boolean(touched && error);
    const isValid = Boolean(touched && !error);
    const idStr = `${meta.form}_${input.name}`;

    return (
        <FormGroup>
            {label && <Label for={idStr}> {label} </Label>}

            <Input
                {...input}
                id={idStr}
                bsSize={size}
                className={className}
                placeholder={placeholder}
                type={type || "text"}
                invalid={isInvalid}
                valid={showValid && isValid}
            />
            {isInvalid && <FormFeedback>{error}</FormFeedback>}
            {isValid && showValid && <FormFeedback valid>{validText}</FormFeedback>}
        </FormGroup>
    )
};

TextInput.propTypes = {
    input: PropTypes.object.isRequired,
};

export default TextInput;
