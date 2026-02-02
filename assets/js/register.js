$(document).ready(function () {
    $('#regForm').submit(function (e) {
        e.preventDefault();
        const pass = $('#regPass').val();
        const passConfirm = $('#regPassConfirm').val();

        if (pass !== passConfirm) {
            $('#reg-msg').html('<div class="alert alert-warning py-2 small">Las contraseñas no coinciden.</div>');
            return;
        }

        const nuevoUsuario = {
            nombre: $('#regNombre').val(),
            email: $('#regEmail').val(),
            password: pass
        };

        // Persistencia de usuario
        localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));

        // Inicializar saldo
        if (!localStorage.getItem('s')) localStorage.setItem('s', '0');

        $('#reg-msg').html('<div class="alert alert-success py-2 small">Cuenta creada. Redirigiendo...</div>');

        setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    });
});