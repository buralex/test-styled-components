import React from 'react'
import {FIELDS as db} from '../constants/fields';

const fileTypesForChat = [
    'image/jpeg',
    'image/png',
    'image/gif',
];

export default values => {
    const errors = {}

    if (!values[db.enquiry_type]) {
        errors[db.enquiry_type] = 'Required'
    }

    if (!values[db.description]) {
        errors[db.description] = 'Required'
    }

    if (!values[db.subject]) {
        errors[db.subject] = 'Required'
    }

    if (!values[db.user_name]) {
        errors[db.user_name] = 'Required'
    } else if (values[db.user_name] && /[^a-zA-Z0-9 ]/i.test(values[db.user_name])) {
        errors[db.user_name] = 'Only alphanumeric characters'
    } else if (values[db.user_name].length > 15) {
        errors[db.user_name] = 'Must be 15 characters or less'
    }

    if (!values[db.email]) {
        errors[db.email] = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values[db.email])) {
        errors[db.email] = 'Invalid email address'
    }


    /* ------------------------ file -------------------------- */

    if (values[db.file]) {
        const file = values[db.file];

        // file size in MB
        const fileSize = Number((file.size / 1024 / 1024).toFixed(1));
        const fileType = file.type;

        if (fileSize > 5) {
            errors[db.file] = `Max file size is 5 MB (your file is ${fileSize} MB)`;
        } else if (!fileTypesForChat.includes(fileType)) {
            errors[db.file] = 'This file extension is not allowed!';
        }
    }

    /* ------------------------ / file ------------------------- */

    return errors;
}
