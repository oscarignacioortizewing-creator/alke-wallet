$(document).ready(function () {
    const movs = JSON.parse(localStorage.getItem('historial')) || [];

    function dibujarHistorial(filtro = 'todos') {
        const contenedor = $('#historialContenedor');
        contenedor.empty();

        let tIngresos = 0;
        let tGastos = 0;

        const filtrados = filtro === 'todos' ? movs : movs.filter(m => m.tipo === filtro);
        $('#count').text(filtrados.length);

        filtrados.forEach(m => {
            const esAbono = m.tipo === 'Abono';
            const colorClase = esAbono ? 'monto-abono' : 'monto-cargo';
            const labelClase = esAbono ? 'label-abono' : 'label-cargo';

            contenedor.append(`
                        <div class="trans-item shadow-sm">
                            <div class="d-flex align-items-center">
                                <div class="mr-3 text-center" style="width: 40px">
                                    <span class="h5 m-0">${esAbono ? '💰' : '💸'}</span>
                                </div>
                                <div>
                                    <h6 class="font-weight-bold mb-0">${m.desc}</h6>
                                    <small class="text-muted">${m.fecha}</small>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="${labelClase} label-tipo mb-1 d-inline-block">${m.tipo}</span>
                                <div class="${colorClase} h5 mb-0">${esAbono ? '+' : '-'} $${m.monto.toLocaleString('es-CL')}</div>
                            </div>
                        </div>
                    `);
        });

        // Calcular totales globales (independiente del filtro)
        movs.forEach(m => {
            if (m.tipo === 'Abono') tIngresos += m.monto;
            else tGastos += m.monto;
        });

        $('#totalIngresos').text('$ ' + tIngresos.toLocaleString('es-CL'));
        $('#totalGastos').text('$ ' + tGastos.toLocaleString('es-CL'));
    }

    // Manejo de clicks en filtros
    $('.btn-filter').click(function () {
        $('.btn-filter').removeClass('active');
        $(this).addClass('active');
        dibujarHistorial($(this).data('f'));
    });

    dibujarHistorial();
});