export function headerBearer() {
    const token=sessionStorage.getItem('token');
    const header= {
        'authorization': `bearer ${token}`
    }
    return header;
}

export function header() {
    const token=sessionStorage.getItem('token');
    const header= {
        'authorization': `${token}`
    }
    return header;
}