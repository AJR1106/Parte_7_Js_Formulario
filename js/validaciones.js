//Validaciones De Fechas

export function valida (input){
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML=mostrarMensajeError(tipoInput, input);
    }
}

    const tipoError = [
        "valueMissing",
        "typeMismatch",
        "patternMismatch",
        "customError",
        
    ];

    const mensajeError = {
        nombre:{
            valueMissing: "El Campo Nombre No Puede Estar Vacio",
        },
        email:{
            valueMissing: "El Campo Email No Puede Estar Vacio",
            typeMismatch: "El Correo No Es Valido"
        },
        password:{
            valueMissing: "El Campo Contraseña No Puede Estar Vacio",
            patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
        },
        nacimiento:{
            valueMissing: "El Campo Fecha De Nacimiento No Puede Estar Vacio",
            customError : "Debes tener al menos 18 años de edad",
        },
        numero: {
            valueMissing : "El Campo Número Telefónico No Puede Estar Vacio",
            patternMismatch: "El Formato Requerido Es (xxx-xxx-xxxx) 10 Numeros"
        },
        direccion:{
            valueMissing : "El Campo Dirección No Puede Estar Vacio",
            patternMismatch: "La Dirección Debe Contener Entre 10 y 40 Caracteres"
        },
        ciudad:{
            valueMissing : "El Campo Ciudad No Puede Estar Vacio",
            patternMismatch: "La Ciudad Debe Contener Entre 4 y 30 Caracteres"
        },
        estado:{
            valueMissing : "El Campo Estado No Puede Estar Vacio",
            patternMismatch: "El Estado Debe Contener Entre 4 y 30 Caracteres"
        }
    };


const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeError(tipoInput, input){
    let mensaje = "";
    tipoError.forEach( (error) => {
        if(input.validity[error]){
            mensaje = mensajeError[tipoInput][error];
        }
    });

    return mensaje;

}

function validarNacimiento (input){
    const fechaCliente = new Date (input.value);
    let mensaje ="";
    if(!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorEdad (fecha){
    const fechaActual = new Date();
    const dierenciaFecha = new Date(
        fecha.getUTCFullYear()+ 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );
    return dierenciaFecha <= fechaActual;
}

////////////////////////////////////

