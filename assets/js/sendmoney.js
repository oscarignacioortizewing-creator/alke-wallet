$(document).ready(function () {
    // 1. Cargar Contactos desde LocalStorage
    function cargarContactos() {
        const agenda = JSON.parse(localStorage.getItem('agendaChilena')) || [
            { nombre: "Arturo Prat", rut: "3.456.789-0" },
            { nombre: "Lucila Godoy", rut: "4.123.456-7" }
        ];

        $('#listaContactos').empty();
        agenda.forEach((c, index) => {
            const inicial = c.nombre.charAt(0).toUpperCase();
            $('#listaContactos').append(`
                        <div class="contact-item d-flex align-items-center p-3" onclick="seleccionarContacto('${c.nombre}')">
                            <div class="avatar mr-3">${inicial}</div>
                            <div>
                                <h6 class="mb-0 font-weight-bold">${c.nombre}</h6>
                                <small class="text-muted">${c.rut}</small>
                            </div>
                        </div>
                    `);
        });
    }

    cargarContactos();

    // 2. Selección de contacto
    window.seleccionarContacto = function (nombre) {
        $('.contact-item').removeClass('active');
        $(event.currentTarget).addClass('active');
        $('#destinatarioNombre').text(nombre);
        $('#panelVacio').hide();
        $('#panelEnvio').fadeIn();
    };

    // 3. Lógica de Envío (Descuento de Saldo)
    $('#sendForm').submit(function (e) {
        e.preventDefault();
        let monto = parseFloat($('#montoEnvio').val());
        let saldoActual = parseFloat(localStorage.getItem('s')) || 0;
        let destino = $('#destinatarioNombre').text();

        if (monto > saldoActual) {
            $('#alert-box').html('<div class="alert alert-danger py-2 small">Saldo insuficiente</div>');
            return;
        }

        // Actualizar Saldo
        localStorage.setItem('s', saldoActual - monto);

        // Registrar en Historial
        let hist = JSON.parse(localStorage.getItem('historial')) || [];
        hist.unshift({
            tipo: 'Cargo',
            monto: monto,
            desc: 'Transferencia a ' + destino,
            fecha: new Date().toLocaleDateString('es-CL')
        });
        localStorage.setItem('historial', JSON.stringify(hist));

        // Éxito
        $('#panelEnvio').fadeOut(300, () => window.location.href = 'menu.html');
    });

    // 4. Agregar Nuevo Contacto
    $('#addCForm').submit(function (e) {
        e.preventDefault();
        let agenda = JSON.parse(localStorage.getItem('agendaChilena')) || [];
        agenda.push({ nombre: $('#cnom').val(), rut: $('#crut').val() });
        localStorage.setItem('agendaChilena', JSON.stringify(agenda));

        this.reset();
        $('#modNuevo').modal('hide');
        cargarContactos();
    });

    // 5. Buscador
    $('#busc').keyup(function () {
        let v = $(this).val().toLowerCase();
        $('.contact-item').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(v) > -1);
        });
    });
});