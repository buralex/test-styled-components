
import axios from 'axios';

const restApi = axios.create({
    baseURL: 'http://504080.com/api/v1',
});

restApi.interceptors.request.use((config) => {
    // eslint-disable-next-line
    const authKey = window.__appStore__.getState().getIn(['global', 'authKey']);
    // eslint-disable-next-line
    config.headers.Authorization = `${authKey}` || `963be28b713448ddd1660b5f8eed91b45ffcfe48`;
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


export const loginRequest = (params) => restApi.post(`/account/login`, {...params});

export default restApi;
