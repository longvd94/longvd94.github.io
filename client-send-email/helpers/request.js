const request =(url, opts = {}) => fetch(url, {
    method: 'GET',
    ...opts,  
})
.then((response) => {
    if (response.status === 204 || response.status === 205) {
        return null;
    } 
    return response.json();
})
.catch(error => {
    console.error('Error:', error);
    throw error;
});

export {
    request,
}