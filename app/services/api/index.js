
import axios from 'axios';
import * as appActions from 'containers/App/actions';

const restApi = axios.create({
    baseURL: 'http://504080.com/api/v1',
});

restApi.interceptors.request.use((config) => {
    // eslint-disable-next-line
    const authKey = window.__global_store__.getState().userData.authKey;
    // eslint-disable-next-line
    config.headers.Authorization = `${authKey}` || `963be28b713448ddd1660b5f8eed91b45ffcfe48`;
    return config;
}, (error) => Promise.reject(error));

restApi.interceptors.response.use((response) => response, (error) => {
    // eslint-disable-next-line
    const isUserLoggedIn = window.__global_store__.getState().userData.authKey;
    if (error.response && error.response.status === 401 && isUserLoggedIn) {
        console.warn('unauthorized, logging out ...');
        // eslint-disable-next-line
        window.__global_store__.dispatch(appActions.logout());
    }
    return Promise.reject(error);
});


/*------------------------------------
          api common functions
---------------------------------------*/
export const fetchCategory = (id, params) => restApi(`/services/categories/${id}`, {params});
export const fetchCategories = (params) => restApi(`/services/categories`, {params});
export const fetchSuggestedFriends = (params) => restApi(`/suggestions/friends`, {params});
//export const fetchSuggestedCompanies = (params) => restApi(`/suggestions/companies`, {params});
export const fetchSuggestedCompanies = (params) => restApi(`/services/categories/121212112`, {params});
export const fetchSuggestedProducts = (params) => restApi(`/suggestions/products`, {params});


export const fetchEnquiryTypes = (params) => restApi(`/directories/enquiry-types`, {params});

// export const fetchEnquiryTypes = (params) => {
//      //delay(3000);
//     return new Promise(resolve => {
//
//         window.setTimeout(() => {
//             const fakeNumber = 1234567890;
//             // dispatch({
//             //     type: actionTypes.LOAD_NUMBER_RESERVED,
//             //     payload: fakeNumber,
//             // });
//             resolve({data: fakeNumber});
//         }, 3000);
//     });
//     //restApi(`/directories/1`, {params})
// };

export const postToSupport = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach(( key ) => {
        formData.append(key, data[ key ]);
    });

    return restApi.post(`/support`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
};


export const loginRequest = (params) => restApi.post(`/account/login`, {...params});
/*------------------------------------
          / api common functions
---------------------------------------*/

export default restApi;
