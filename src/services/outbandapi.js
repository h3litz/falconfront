import request from '@/utils/request';
import cookie from 'react-cookies';

export async function queryOutbands(params) {
    const { method, search = '', name = '', location = '', domain = '', sourceIp = '', currentPage = '', pageSize = '' } = params;
    if (typeof (params) === "undefined" && typeof (method) === "undefined") {
        alert('params error or method no provide!');
        return '';
    };
    let callback;
    const currentRealPage = currentPage === '' ? '' : currentPage - 1;
    switch (method) {
        case 'xss':
            if (search || name || location || sourceIp || currentPage || pageSize) {
                callback = `/api/outband/xss?search=${search}&name=${name}&location=${location}&source_ip=${sourceIp}&limit=${pageSize}&offset=${currentRealPage}0`;
            } else {
                callback = `/api/outband/xss`
            };
            break;
        case 'dns':
            if (search || name || domain || sourceIp || currentPage || pageSize) {
                callback = `/api/outband/dns?search=${search}&name=${name}&domain=${domain}&source_ip=${sourceIp}&limit=${pageSize}&offset=${currentRealPage}0`;
            } else {
                callback = `/api/outband/dns`
            };
            break;
        case 'http':
            if (search || sourceIp || currentPage || pageSize) {
                callback = `/api/outband/http?search=${search}&source_ip=${sourceIp}&limit=${pageSize}&offset=${currentRealPage}0`;
            } else {
                callback = `/api/outband/http`
            };
            break;
        default:
            alert(`method no ${method} provide!`);
            return '';
    };
    return request(callback, {
        headers: {
            "X-CSRFToken": cookie.load('csrftoken'),
            "Authorization": `Token ${localStorage.getItem('Token')}`
        },
    });
}

export async function bulkDeleteOutbands(params) {
    const { method } = params;
    if (typeof (params) === "undefined" && typeof (method) === "undefined") {
        alert('params error or method no provide!');
        return '';
    };
    return request(`/api/outband/${method}/delete`, {
        method: 'POST',
        body: {
            ...params,
        },
        headers: {
            "X-CSRFToken": cookie.load('csrftoken'),
            "Authorization": `Token ${localStorage.getItem('Token')}`
        },
    });
}

export async function queryOutband(params) {
    const { method } = params;
    if (typeof (params) === "undefined" && typeof (method) === "undefined") {
        alert('params error or method no provide!');
        return '';
    };
    return request(`/api/outband/${method}/${params.id}`, {
        method: 'GET',
        headers: {
            "X-CSRFToken": cookie.load('csrftoken'),
            "Authorization": `Token ${localStorage.getItem('Token')}`
        },
    });
}

export async function addOutband(params) {
    const { method } = params;
    if (typeof (params) === "undefined" && typeof (method) === "undefined") {
        alert('params error or method no provide!');
        return '';
    };
    return request(`/api/outband/${method}`, {
        method: 'POST',
        body: {
            ...params,
        },
        headers: {
            "X-CSRFToken": cookie.load('csrftoken'),
            "Authorization": `Token ${localStorage.getItem('Token')}`
        },
    });
}

export async function deleteOutband(params) {
    const { method } = params;
    if (typeof (params) === "undefined" && typeof (method) === "undefined") {
        alert('params error or method no provide!');
        return '';
    };
    return request(`/api/outband/${method}/${params.id}`, {
        method: 'DELETE',
        headers: {
            "X-CSRFToken": cookie.load('csrftoken'),
            "Authorization": `Token ${localStorage.getItem('Token')}`
        },
    });
}
