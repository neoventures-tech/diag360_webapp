
export const PUBLIC_ROUTES = {
    LOGIN: '/',

}
export const ROUTES = {

    ...PUBLIC_ROUTES,
    HOME: '/home',
    NOT_FOUND: '*'
};


export function formatPath(path, parms, queryParams) {
    let newPath = path
    if (parms) {
        Object.keys(parms).forEach((key) => {
            let regex = new RegExp(`:${key}\\??`)
            newPath = newPath?.replace(regex, parms[key])
        })
    }
    if (queryParams) {
        newPath += '?'
        Object.keys(queryParams).forEach((key, index) => {
            let caractere = '&'
            if (index === 0) caractere = ''
            newPath += `${caractere}${key}=${queryParams[key]}`
        })
    }

    return newPath
}