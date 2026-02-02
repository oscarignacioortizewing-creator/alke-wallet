$(document).ready(function () {
    // 1. Mostrar nombre de usuario (Paso solicitado: gestión de login)
    const nombre = localStorage.getItem('sesionActiva') || 'Usuario';
    $('#nombreUser').text(nombre);

    // 2. Cargar Saldo en Línea (Paso solicitado: visualización de activos)
    function actualizarSaldoVista() {
        const saldo = parseFloat(localStorage.getItem('s')) || 0;
        $('#saldoActual').text('$ ' + saldo.toLocaleString('es-CL'));
    }
    actualizarSaldoVista();

    // 3. Cerrar Sesión
    $('#btnLogout').click(function () {
        localStorage.removeItem('sesionActiva');
        window.location.href = 'login.html';
    });
});