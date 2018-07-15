
import axios from 'axios';

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

// axios.interceptors.response.use((response) => {
//     // Do something with response data
//     return response;
// }, (error) => {
//     // Do something with response error
//     return Promise.reject(error);
// });

/*------------------------------------
          api common functions
---------------------------------------*/
export const fetchCategory = (id, params) => restApi(`/services/categories/${id}`, {params});
export const fetchCategories = (params) => restApi(`/services/categories`, {params});
export const fetchFriends = (params) => restApi(`/suggestions/friends`, {params});


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
    console.log(data);
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