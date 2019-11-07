(function(){
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


function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#preview').attr('src', e.target.result).removeClass("oculto");
      }
      
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  