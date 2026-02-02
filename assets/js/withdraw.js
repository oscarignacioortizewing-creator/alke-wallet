$(document).ready(function () {
    // Mostrar saldo actual
    let saldoActual = parseFloat(localStorage.getItem('s')) || 0;
    $('#disponible').text('$' + saldoActual.toLocaleString('es-CL'));

    $('#withForm').submit(function (e) {
        e.preventDefault();
        let monto = parseFloat($('#monto').val());

        if (monto > saldoActual) {
            $('#alert-box').html('<div class="alert alert-danger py-2 small text-center">Saldo insuficiente</div>');
            return;
        }

        // Actualizar Saldo
        localStorage.setItem('s', saldoActual - monto);

        // Registro Historial
        let hist = JSON.parse(localStorage.getItem('historial')) || [];
        hist.unshift({
            tipo: 'Cargo',
            monto: monto,
            desc: 'Retiro de efectivo',
            fecha: new Date().toLocaleDateString('es-CL')
        });
        localStorage.setItem('historial', JSON.stringify(hist));

        $('.card-withdraw').fadeOut(300, function () {
            window.location.href = 'menu.html';
        });
    });
});