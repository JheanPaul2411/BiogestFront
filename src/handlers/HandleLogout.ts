export const handleLogout = () => {
    sessionStorage.setItem('token', '');
    // Actualizar el estado local o redirigir a la página de inicio de sesión sin recargar la página.
    window.location.href = '/';
    return false;
};