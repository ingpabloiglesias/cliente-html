(function() {
    cargarCuentas()
})();

var clientes = [];

function cargarCuentas() {
    jQuery.ajax({
        url: "http://localhost:3000/v1/cuentas"
    }).done((data) => {
        clientes = data;
        cargarFilas(data);
    });
}

function filtrarTabla() {
    const cadena = $("#filtro-texto").val().toLowerCase();
    const filtrado = clientes.filter((elem) => {
        let check = false
        if (elem.nombre)
            check = check || elem.nombre.toLowerCase().includes(cadena);
        if (elem.apellido)
            check = check || elem.apellido.toLowerCase().includes(cadena);
        if (elem.email)
            check = check || elem.email.toLowerCase().includes(cadena);
        return check;
    });

    cargarFilas(filtrado);
}

function cargarFilas(datos) {
    const tablaClientesCuerpo = $("#tablaClientes");
    tablaClientesCuerpo.find("tbody tr").remove();
    datos.forEach((cliente, ind) => {
        if (cliente.nombre || cliente.apellido || cliente.email) {
            const row = `<tr id="cliente-${ind}">
            <th scope="row">${ind + 1}</th>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.email}</td>
            </tr>`;
            tablaClientesCuerpo.append(row);
        }
    })
}

function recargarTabla() {
    $("#filtro-texto").val("");
    jQuery.ajax({
        url: "http://localhost:3000/v1/cuentas"
    }).done((data) => {
        clientes = data;
        cargarFilas(data);
    });
}