(function(){
    $("#cliente-formulario").on("submit", (ev) => {
        ev.preventDefault();
        $("#cliente-submit-disabled").removeClass("oculto");
        $("#cliente-submit").addClass("oculto");
        $(".alert-danger").addClass("oculto");
        const nuevoCliente = {
            "nombre": $("#cliente-nombre").val(),
            "apellido": $("#cliente-apellido").val(),
            "usuario": $("#cliente-usuario").val(),
            "email": $("#cliente-email").val(),
            "password": $("#cliente-password").val(),
            "fecha_nacimiento": $("#cliente-nacimiento").val()
        };
        console.log(nuevoCliente);
        setTimeout(function(){
            $.ajax({
                url: "http://localhost:3000/v1/cuentas",
                method: "POST",
                data: nuevoCliente,
                dataType: "json"
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
})();