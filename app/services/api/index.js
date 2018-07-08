// import 'whatwg-fetch';
//
// /**
//  * Parses the JSON returned by a network request
//  *
//  * @param  {object} response A response from a network request
//  *
//  * @return {object}          The parsed JSON from the request
//  */
// function parseJSON(response) {
//     if (response.status === 204 || response.status === 205) {
//         return null;
//     }
//     return response.json();
// }
//
// /**
//  * Checks if a network request came back fine, and throws an error if not
//  *
//  * @param  {object} response   A response from a network request
//  *
//  * @return {object|undefined} Returns either the response, or throws an error
//  */
// function checkStatus(response) {
//     if (response.status >= 200 && response.status < 300) {
//         return response;
//     }
//
//     const error = new Error(response.statusText);
//     error.response = response;
//     throw error;
// }

// /**
//  * Requests a URL, returning a promise
//  *
//  * @param  {string} url       The URL we want to request
//  * @param  {object} [options] The options we want to pass to "fetch"
//  *
//  * @return {object}           The response data
//  */
// export default function request(url, options) {
//     return fetch(url, options)
//         .then(checkStatus)
//         .then(parseJSON);
// }

import axios from 'axios';

const restApi = axios.create({
    baseURL: 'http://504080.com/api/v1',
});

restApi.interceptors.request.use((config) => {
    config.headers.Authorization = `963be28b713448ddd1660b5f8eed91b45ffcfe48`;
    return config;
}, (error) => Promise.reject(error));

// axios.interceptors.response.use((response) => {
//     // Do something with response data
//     return response;
// }, (error) => {
//     // Do something with response error
//     return Promise.reject(error);
// });

export const fetchCategory = (id, params) => restApi(`/services/categories/${id}`, {params});
export const fetchCategories = (params) => restApi(`/services/categories`, {params});
export const fetchFriends = (params) => restApi(`/suggestions/friends`, {params});

export default restApi;
