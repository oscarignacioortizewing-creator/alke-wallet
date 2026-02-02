        $(document).ready(function() {
            $('#depForm').submit(function(e) {
                e.preventDefault();
                let monto = parseFloat($('#monto').val());
                let saldo = parseFloat(localStorage.getItem('s')) || 0;
                
                // Actualizar Saldo
                localStorage.setItem('s', saldo + monto);
                
                // Registro Historial
                let hist = JSON.parse(localStorage.getItem('historial')) || [];
                hist.unshift({
                    tipo: 'Abono',
                    monto: monto,
                    desc: 'Depósito directo',
                    fecha: new Date().toLocaleDateString('es-CL')
                });
                localStorage.setItem('historial', JSON.stringify(hist));

                // Efecto de éxito
                $('.card-deposit').fadeOut(300, function() {
                    window.location.href = 'menu.html';
                });
            });
        });