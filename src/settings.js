let endpoint;
let ws_endpoint;
const debug = Boolean(import.meta.env.VITE_DEBUG);
let sessionCookieDoamin;
let hostEntrepreneur;
let sessionCookiePrefix;
let enviroment_name;
let react_app_version;
const enviroment = import.meta.env.VITE_APP_ENV
if (enviroment === 'prod') {
    endpoint = 'https://api.solv.network/'
    ws_endpoint = 'wss://api.solv.network/ws/'
    sessionCookieDoamin = '.solv.network';
    hostEntrepreneur = 'app.solv.network';
    sessionCookiePrefix = 'solv_network';
    enviroment_name = 'PROD';

} else if (enviroment === 'homo') {
    endpoint = 'https://api.homolog.solv.network/'
    ws_endpoint = 'wss://api.homolog.solv.network/ws/'
    sessionCookieDoamin = '.homolog.solv.network';
    hostEntrepreneur = 'app.homolog.solv.network';
    sessionCookiePrefix = 'solv_homolog';
    enviroment_name = 'HOMOLOGATION';

} else if (enviroment === 'samarco') {
    endpoint = 'https://api.solvsamarco.com.br/'
    ws_endpoint = 'wss://api.solvsamarco.com.br/ws/'
    sessionCookieDoamin = 'solvsamarco.com.br';
    hostEntrepreneur = 'app.solvsamarco.com.br';
    sessionCookiePrefix = 'solv_samarco';
    enviroment_name = 'CUSTOMIZED';
} else {
    endpoint = 'http://localhost:8000/'
    ws_endpoint = 'ws://api.solv.networklocal:8001/ws/'
    sessionCookieDoamin = '.solv.networklocal';
    hostEntrepreneur = 'app.solv.networklocal:3000';
    // sessionCookieDoamin = 'localhost';
    // hostEntrepreneur = 'localhost:3000';
    sessionCookiePrefix = 'solv_local';
    enviroment_name = 'LOCAL';
}

if (import.meta.env.VITE_APP_VERSION) {
    react_app_version = import.meta.env.VITE_APP_VERSION;
}

export const modules = {
    PROGRAM: 'program',
    PROJECT: 'project',
}

export const BASE_ENDPOINT = endpoint;
export const WS_ENDPOINT = ws_endpoint;
export const DEBUG = debug;
export const SESSION_COOKIE_DOMAIN = sessionCookieDoamin;
export const HOST_ENTREPRENEUR = hostEntrepreneur;
export const SESSION_COOKIE_PREFIX = sessionCookiePrefix;
export const REACT_APP_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
export const MICROSOFT_APP_CLIENT_ID = import.meta.env.VITE_MICROSOFT_APP_CLIENT_ID;
export const MICROSOFT_APP_TENANT_ID = import.meta.env.VITE_MICROSOFT_APP_TENANT_ID;
export const GOOGLE_APP_CLIENT_ID = import.meta.env.VITE_GOOGLE_APP_CLIENT_ID;
export const GOOGLE_CAPTCHA_SITE_ID = import.meta.env.VITE_GOOGLE_CAPTCHA_SITE_ID;
export const ENVIROMENT = enviroment_name;
export const APP_VERSION = react_app_version;