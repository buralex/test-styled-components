import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';

Select.defaultProps = {
    multi: false,
    className: "",
};

Select.propTypes = {
    input: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onBlur: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
    }).isRequired,
    options: PropTypes.array.isRequired,
    multi: PropTypes.bool,
    className: PropTypes.string,
};


export default function Select ({
    input, placeholder, label, meta: {touched, error}, meta,
    showValid, validText, options, multi, className,
}) {

    const { name, value, onBlur, onChange, onFocus } = input;

    const transformedValue = transformValue(value, options, multi);

    const isInvalid = Boolean(touched && error);
    const isValid = Boolean(touched && !error);
    const idStr = `${meta.form}_${input.name}`;

    return (
        <FormGroup className={`select-component ${isInvalid ? 'has-error' : ''}`} >
            {label && <Label for={idStr}> {label} </Label>}

            <ReactSelect
                id={idStr}
                valueKey="value"
                name={name}
                value={transformedValue}
                multi={multi}
                options={options}
                onChange={multi
                    ? multiChangeHandler(onChange)
                    : singleChangeHandler(onChange)
                }
                onBlur={() => onBlur(value)}
                onFocus={onFocus}
                className={className}
                arrowRenderer={arrowRenderer}
                placeholder={placeholder}
            />

            {isInvalid && <FormFeedback style={{display: 'block'}}>{error}</FormFeedback>}
            {isValid && showValid && <FormFeedback valid>{validText}</FormFeedback>}

        </FormGroup>
    );
}

function arrowRenderer () {
    return (
        <FontAwesomeIcon icon="angle-down"/>
    );
}

/**
 * onChange from Redux Form Field has to be called explicity.
 */
function singleChangeHandler(func) {
    return function handleSingleChange(value) {
        func(value ? value.value : '');
    };
}

/**
 * onBlur from Redux Form Field has to be called explicity.
 */
function multiChangeHandler(func) {
    return function handleMultiHandler(values) {
        func(values.map(value => value.value));
    };
}

/**
 * For single select, Redux Form keeps the value as a string, while React Select
 * wants the value in the form { value: "grape", label: "Grape" }
 *
 * * For multi select, Redux Form keeps the value as array of strings, while React Select
 * wants the array of values in the form [{ value: "grape", label: "Grape" }]
 */
function transformValue(value, options, multi) {
    if (multi && typeof value === 'string') return [];

    const filteredOptions = options.filter(option => {
        return multi
            ? value.indexOf(option.value) !== -1
            : option.value === value;
    });

    return multi ? filteredOptions : filteredOptions[0];
}
