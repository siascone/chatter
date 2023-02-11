export const csrfFetch = async (url, options = {}) => {
    options.method ||= 'GET';
    options.headers ||= {};
    // will need to modify this when using formData to attach resources like photos
    // can't have a Content-Type header
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }

    const res = await fetch(url, options);

    if (res.status >= 400) throw res;
    
    return res
}