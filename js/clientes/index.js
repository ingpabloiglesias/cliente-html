(function() {
    cargarCuentas();

    $("#cliente-formulario").on("submit", (ev) => {
        ev.preventDefault();
        $("#cliente-submit-disabled").removeClass("oculto");
        $("#cliente-submit").addClass("oculto");
        $(".alert-danger").addClass("oculto");
        const form = document.getElementById("cliente-formulario");
        const nuevoClienteForm = new FormData(form);
        setTimeout(function(){
            $.ajax({
                url: "http://localhost:3000/v1/cuentas",
                method: "POST",
                data: nuevoClienteForm,
                dataType: "json",
                processData: false,  // tell jQuery not to process the data
                contentType: false   // tell jQuery not to set contentType
            }).done((data) => {
                $(".alert-success").removeClass("oculto");
                $('#cliente-formulario').trigger("reset");
                $("#cliente-submit-success").removeClass("oculto");
                setTimeout(() => {
                    window.location = "/clientes.html";
                }, 3000);
            }).fail((err) => {
                $(".alert-danger").removeClass("oculto");
                $("#cliente-submit").removeClass("oculto");
            }).always(() => {
                $("#cliente-submit-disabled").addClass("oculto");
            });
        }, 3000);
    });

    $("#cliente-imagen").change(function() {
        readURL(this);
    });
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
            <td>
            <button type="button" onclick="editarCliente('${cliente._id}')" class="btn btn-secondary" data-toggle="modal" data-target="#editarCliente">
                Editar
            </button>
            <button id="elim-${cliente._id}" type="button" class="btn btn-danger" onclick="eliminarCliente('${cliente._id}')">Eliminar</button>
            </td>
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

function editarCliente(idCliente) {
    console.log(idCliente);
    $.ajax({
        url: "http://localhost:3000/v1/cuentas/" + idCliente,
        dataType: "json"
    }).done((data) => {
        $("#modalTitle").html(`Editando cliente ${data.nombre} ${data.apellido}`);
        $("#cliente-nombre").val(data.nombre);
        $("#cliente-apellido").val(data.apellido);
        $("#cliente-nacimiento").val(data.fecha_nacimiento);
        $('#preview').attr('src', data.imagen).removeClass("oculto");
        console.log(data);
    }).fail((err) => {
        console.log(err);
    }).always(() => {
        console.log("Siempre");
    });
}

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#preview').attr('src', e.target.result).removeClass("oculto");
      }
      
      reader.readAsDataURL(input.files[0]);
    }
  }