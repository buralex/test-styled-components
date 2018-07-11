
import React from 'react'
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const Select = ({
    input, placeholder, label, type, meta: {touched, error}, meta, showValid, validText,
}) => {

    const isInvalid = Boolean(touched && error);
    const isValid = Boolean(touched && !error);
    const idStr = `${meta.form}_${input.name}`;

    return (
        <FormGroup>
            <Label for={idStr}> {label} </Label>
            <Input
                id={idStr}
                {...input}
                placeholder={placeholder}
                type={type || "select"}
                invalid={isInvalid}
                valid={showValid && isValid}
            />
            {isInvalid && <FormFeedback>{error}</FormFeedback>}
            {isValid && showValid && <FormFeedback valid>{validText}</FormFeedback>}
        </FormGroup>
    )
};

Select.propTypes = {
    input: PropTypes.object.isRequired,
};

export default Select;
