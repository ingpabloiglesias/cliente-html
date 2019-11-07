(function() {
    cargarCuentas();
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
    let indice = 1;
    datos.forEach((cliente, ind) => {
        if (cliente.nombre || cliente.apellido || cliente.email) {
            const row = `<tr id="cliente-${ind}">
            <th scope="row">${indice}</th>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.email}</td>
            <td><button id="elim-${cliente._id}" type="button" class="btn btn-danger" onclick="eliminarCliente('${cliente._id}')">Eliminar</button></td>
            </tr>`;
            tablaClientesCuerpo.append(row);
            indice++;
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

function eliminarCliente(idCliente) {
    if(confirm("Esta seguro que desea eliminar el cliente con id " + idCliente)) {
        $("#elim-" + idCliente).attr("disabled", true);
        setTimeout(function(){
            $.ajax({
                url: "http://localhost:3000/v1/cuentas/" + idCliente,
                method: "DELETE",
                dataType: "json"
            }).done(() => {
                $(".alert-success").removeClass("oculto");
                $(".alert-error").addClass("oculto");
                recargarTabla();
            }).fail((err) => {
                $("#elim-" + idCliente).removeAttr("disabled");
                $(".alert-error").removeClass("oculto");
                $(".alert-success").addClass("oculto");
                console.log(err);
            }).always(() => {
                console.log("Siempre");
            });
            
        }, 3000);
    } else {
        return false;
    }
}