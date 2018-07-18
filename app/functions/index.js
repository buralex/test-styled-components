export const trimFields = (values) => {
    const fields = {};
    let fieldValue = '';
    Object.keys(values).forEach((fieldName) => {
        fieldValue = values[fieldName] && values[fieldName].trim();
        fieldValue = fieldValue && fieldValue.replace(/\s\s+/g, ' '); // replace extra spaces with one

        if (fieldValue) {
            fields[fieldName] = fieldValue;
        }
    });
    return fields;
};
