import axios from 'axios';
import {BASE_ENDPOINT} from '../settings'


const LOGIN_EXPIRED = 'Login Expired'
axios.defaults.baseURL = BASE_ENDPOINT

axios.interceptors.request.use((config) => {
    // config.headers.common['Accept-Language'] = `${getLanguage()}`
    config['withCredentials'] = true

    const pattern = /^v\d+/;
    const {url} = config;

    if (!pattern.test(url)) {
        // let version = config['version'] || 'v1'
        // if (!config['baseURL'].includes(version)) {
        //     config['baseURL'] += version + '/'
        // }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401) {
            if (error.response.data.errors['code'] === 'token_not_valid' && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    // Chama o endpoint de renovação de token
                    await axios.post('auth/refresh')


                    return axios(originalRequest);
                } catch (err) {
                    // Redireciona para login se a renovação falhar
                    return _logout_and_redirect()

                }

            }
            if (error.response.data.errors['code'] === 'not_authenticated') {

                window.location.href = "/login";
            }
        }


// window.location.href = "/login";
        return Promise.reject(error);
    }
);

function _logout_and_redirect() {


    return Promise.reject({
        'message': t(LOGIN_EXPIRED),
        'error': t(LOGIN_EXPIRED),
        'detail': t(LOGIN_EXPIRED),
        "response": {
            'message': t(LOGIN_EXPIRED),
            'error': t(LOGIN_EXPIRED),
            'detail': t(LOGIN_EXPIRED),
            'data': {
                'message': t(LOGIN_EXPIRED),
                'error': t(LOGIN_EXPIRED),
                'detail': t(LOGIN_EXPIRED),
            }
        }
    })
}
const api = axios;
export default api;