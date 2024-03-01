export function headerBearer() {
    const token=localStorage.getItem('token');
    const header= {
        'authorization': `bearer ${token}`
    }
    return header;
}

export function header() {
    const token=localStorage.getItem('token');
    const header= {
        'authorization': `${token}`
    }
    return header;
}