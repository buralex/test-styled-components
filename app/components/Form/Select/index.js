
import React from 'react'
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const Select = ({
    input, placeholder, label, type, meta: {touched, error}, meta, showValid, validText, options,
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
            >
                {options && options.map((opt, i) =>
                    <option key={`${opt.label}_${i+1}`} value={opt.value}>{opt.label}</option>)}
            </Input>
            {isInvalid && <FormFeedback>{error}</FormFeedback>}
            {isValid && showValid && <FormFeedback valid>{validText}</FormFeedback>}
        </FormGroup>
    )
};

Select.propTypes = {
    input: PropTypes.object.isRequired,
};

export default Select;
