export function isAuthenticated() {

    //Trae el token desde el localStorage
    const token = localStorage.getItem('access_token');

    //Verifica si el token existe
    if (token) {
        return true;
    } else {
        return false;
    }

}

export function login(token) {
    //Guarda el token en el local storage
    localStorage.setItem("access_token", token)
}

export function logout() {
    //Quita el token de el local storage
    localStorage.removeItem("access_token");
}