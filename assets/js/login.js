$(document).ready(function () {
    $('#loginForm').submit(function (e) {
        e.preventDefault();

        const emailIngresado = $('#email').val();
        const passIngresada = $('#pass').val();

        // Recuperar el usuario registrado (o usar uno por defecto para pruebas)
        const userRegistrado = JSON.parse(localStorage.getItem('usuarioRegistrado')) || {
            email: 'admin@wallet.com',
            password: '123',
            nombre: 'Administrador'
        };

        if (emailIngresado === userRegistrado.email && passIngresada === userRegistrado.password) {
            // Guardar sesión activa
            localStorage.setItem('sesionActiva', userRegistrado.nombre);

            // Efecto de transición
            $('.login-card').css('opacity', '0.5');
            window.location.href = 'menu.html';
        } else {
            $('#login-alert').html(`
                        <div class="alert alert-custom py-2 px-3 mb-3 text-center">
                            Correo o contraseña incorrectos
                        </div>
                    `);
        }
    });
});