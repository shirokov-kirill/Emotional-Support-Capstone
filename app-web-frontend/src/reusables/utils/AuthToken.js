export function getUserAuthToken() {
    // Wait for Authorisation
    return localStorage.getItem('authToken')
}
