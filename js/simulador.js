//Objetos necesarios
class Plan {
    constructor(id, nombre, cobertura, eventos, costo) {
        this.id = id,
            this.nombre = nombre,
            this.cobertura = cobertura,
            this.eventos = [eventos],
            this.costo = costo

    }
    mostrarId() {
        return this.id
    }
    devolverCosto() {
        return this.costo
    }
    devolverNombre() {
        return this.nombre
    }
    devolverCobertura() {
        return this.cobertura
    }
    devolverEventos() {
        for (let i = 0; this.eventos.length >= i; i++) {
            return this.eventos[i]
        }
    }


}

class Contrato {
    constructor(id, rut, nombre, edad, telefono, planAsociado) {
        this.id = id,
            this.rut = rut,
            this.nombre = nombre,
            this.edad = edad,
            this.telefono = telefono,
            this.planAsociado = planAsociado
    }
    devolverId() {
        return this.id
    }
    devolverNombre() {
        return this.nombre
    }
}
//Variables
//Carga de Planes desde json
const cargarPlanes = async () => {
    const respuesta = await fetch("./planes.json")
    const datos = await respuesta.json()
    for (let plan of datos) {
        let nuevoPlan = new Plan(plan.id, plan.nombre, plan.cobertura, plan.caracteristicas, plan.costo)
        carteraPlanes.push(nuevoPlan)
    }
}
cargarPlanes()
let carteraPlanes = []
if (localStorage.getItem("carteraPlanes")) {
    carteraPlanes = JSON.parse(localStorage.getItem("carteraPlanes"))
} else {
    localStorage.setItem("carteraPlanes", carteraPlanes)
}
//Validacion Storage
let contratosRealizados = []
if (localStorage.getItem("contratosRealizados")) {
    contratosRealizados = JSON.parse(localStorage.getItem("contratosRealizados"))

} else {
    contratosRealizados = []
    localStorage.setItem("contratosRealizados", contratosRealizados)
}


//------------------------------------------------------------------------------
//Funciones
//funcion para mostrar los planes disponibles
const planesDisponibles = async () => {
    resetear()
    let divSeleccion = document.getElementById("mostrarPlanes")
    divSeleccion.innerHTML = ""
    carteraPlanes.forEach((carteraPlanes) => {
        let mostrarPlanes = document.createElement("div")
        mostrarPlanes.className = "col-lg-3 col-md-6 mb-5 mb-lg-0"
        mostrarPlanes.id = "planesDisponibles"
        mostrarPlanes.innerHTML = `
            <span class="service-icon rounded-circle mx-auto mb-3"><i class="icon-screen-smartphone"></i></span>
            <h4><strong>${carteraPlanes.nombre}</strong></h4>
            <p class="text-faded mb-0"><strong>Cobertura: ${carteraPlanes.cobertura}</strong></p>
            <p class="text-faded mb-0"><strong>Costo: ${carteraPlanes.costo}</strong></p>
            <button type="button" class="btn btn-primary btn-lg" id="${carteraPlanes.id}">Ver Detalle</button>
    </div>`
        divSeleccion.appendChild(mostrarPlanes)
        let btnDetalle = document.getElementById(`${carteraPlanes.id}`)
        btnDetalle.addEventListener("click", verDetallePlan)


    })
}
//funcion para obtener el id del boton "verdetalles" y mostrar informacion correspondiente
async function verDetallePlan(evt) {

    let id = evt.target.id
    let plan = carteraPlanes.find(function (element) {

        return element.mostrarId() === parseInt(id)

    })
    let sueldoSugerido = Math.round((plan.costo / 0.07) + 1)

    Swal.fire({
        title: `${plan.cobertura}`,
        icon: `info`,
        html: `<div>
                 <h4>Cobertura Contra:<h4>
                 <p>${plan.devolverEventos()}<p>
                 <p>Sueldo Sugerido: ${sueldoSugerido}<p>
            </div>`


    })

}
//Funcion para controlar mediante el evento change las opciones de planes segun el sueldo ingresado.
const verOpcionesPlanes = async () => {
    let sueldo = document.getElementById("inputSueldo").value
    let prima = Math.round(sueldo * 0.07)
    let divSeleccion = document.getElementById("mostrarOpciones")
    divSeleccion.innerHTML = ""
    carteraPlanes.forEach((carteraPlanes) => {
        if (prima >= carteraPlanes.costo) {
            let mostrarPlan = document.createElement("div")
            mostrarPlan.className = "col-lg-3 col-md-6 mb-5 mb-lg-0"
            mostrarPlan.id = "mostrarOpcionesPlanes"
            mostrarPlan.innerHTML = `
            <span class="service-icon rounded-circle mx-auto mb-3"><i class="icon-screen-smartphone"></i></span>
            <h4><strong>${carteraPlanes.nombre}</strong></h4>
            <p class="text-faded mb-0"><strong>Cobertura: ${carteraPlanes.cobertura}</strong></p>
            <p class="text-faded mb-0"><strong>Costo: ${carteraPlanes.costo}<strong></p>
            <button type="button" class="btn btn-secondary btn-lg" id="${carteraPlanes.id}">Contratar Plan!</button>
            </div>`
            divSeleccion.appendChild(mostrarPlan)
            let btnContrato = document.getElementById(`${carteraPlanes.id}`)
            btnContrato.addEventListener("click", formCrearContrato)
        }
        else if (prima < carteraPlanes.costo) {
            let mostrarPlan = document.createElement("div")
            mostrarPlan.className = "col-lg-3 col-md-6 mb-5 mb-lg-0"
            mostrarPlan.innerHTML = `
            <span class="service-icon rounded-circle mx-auto mb-3"><i class="icon-screen-smartphone"></i></span>
            <h4><strong>${carteraPlanes.nombre}</strong></h4>
            <p class="text-faded mb-0"><strong>Cobertura: ${carteraPlanes.cobertura}</strong></p>
            <p class="text-faded mb-0"><strong>Costo: ${carteraPlanes.costo}</strong></p>
            <button type="button" class="btn btn-secondary btn-lg" id="${carteraPlanes.id}" disabled>No Disponible</button>
            </div>`
            divSeleccion.appendChild(mostrarPlan)

        }
    })

}

//funcion para crear el formulario para contratar un plan segun la opcion que tengas.
async function formCrearContrato(evt) {

    let id = evt.target.id
    let plan = carteraPlanes.find(function (element) {

        return element.mostrarId() === parseInt(id)

    })
    let divForm = document.getElementById("crearContratoPlan")
    divForm.innerHTML = ""
    let div = document.createElement("div")
    div.className = `container px-4 px-lg-5 text-center`
    div.innerHTML = `<div class="mb-3"> 
                        <br>                  
                        <h1 id="nombrePlan">${plan.nombre}</h1>
                       
                        <label for="formularioCreacionContrato" class="form-label">Ingresa tu Rut o DNI</label>
                        <input type="text" class="form-control" id="rut" placeholder="Ingresa tu Rut o DNI">
                       
                    </div>
                    <div class="mb-3">
                        <label for="formularioCreacionContrato" class="form-label">Ingresa tu Nombre</label>
                        <input type="text" class="form-control" id="nombre" placeholder="Ingresa tu Nombre Completo">
                    </div>
                    <div class="mb-3">
                        <label for="formularioCreacionContrato" class="form-label">Ingresa tu Edad</label>
                        <input type="text" class="form-control" id="edad" placeholder="Ingresa tu Edad">
                        <label class="form-label" id="validaEdad"></label>
                    </div>
                    <div class="mb-3">
                        <label for="formularioCreacionContrato" class="form-label">Ingresa tu telefono</label>
                        <input type="text" class="form-control" id="telefono" placeholder="Ingresa tu Telefono">
                        
                    </div>
                    <div class="mb-3" id="areaBoton"><button type="button" class="btn btn-secondary btn-lg" id="contratarPlan" disabled>Contratar Plan!</button></div>               </div>
                    
                   </div>`
    divForm.appendChild(div)

    let edad = document.getElementById("edad")
    edad.addEventListener("change", validarEdad)

}
//Funcion para validar creacion
function camposVacios(valor) {
    if (valor != "") {
        return true

    } else {
        return false
    }

}

function validarEdad() {
    let div = document.getElementById("crearContratoPlan")
    let edad = document.getElementById("edad").value
    let crearBtn = document.getElementById("areaBoton")

    if (edad >= 18) {
        crearBtn.innerHTML = ``
        crearBtn.innerHTML = `<button type="button" class="btn btn-secondary btn-lg" id="contratarPlan">Contratar Plan!</button></div>`
        let mensaje = document.getElementById("validaEdad")
        mensaje.innerText = ""
        div.appendChild(crearBtn)
        let btnContratar = document.getElementById("contratarPlan")
        btnContratar.addEventListener("click", crearContrato)
    } else if (edad < 18) {
        crearBtn.innerHTML = ``
        crearBtn.innerHTML = `<button type="button" class="btn btn-secondary btn-lg" id="contratarPlan" disabled>Contratar Plan!</button></div>`
        let mensaje = document.getElementById("validaEdad")
        mensaje.innerText = "Debes tener mas de 18 años para contratar un plan"
        div.appendChild(crearBtn)
    }

}
//funcion para validar que no exista un rut igual para un contrato
function validarRut(rut) {
    let rutStorage = JSON.parse(localStorage.getItem("contratosRealizados"))
    let arrayRuts = rutStorage.find(element => element.rut == rut)
    if (arrayRuts != undefined) {
        return true
    } else {

        return false
    }

}
//funcion para crear un contrato
function crearContrato() {
    let rut = document.getElementById("rut").value
    let nombre = document.getElementById("nombre").value
    let edad = document.getElementById("edad").value
    let telefono = document.getElementById("telefono").value
    let plan = document.getElementById("nombrePlan").innerText

    if ((camposVacios(rut) == true && camposVacios(nombre) == true && camposVacios(telefono) == true)) {

        if (validarRut(rut) == false) {
            let contratoCreado = new Contrato(contratosRealizados.length + 1, rut, nombre, edad, telefono, plan)
            contratosRealizados.push(contratoCreado)
            localStorage.setItem("contratosRealizados", JSON.stringify(contratosRealizados))
            Swal.fire({
                title: `FELICIDADES!`,
                text: `Has Contratado el ${plan} `
            })
            let reset = document.getElementById("crearContratoPlan")
            reset.innerHTML = ""
            let resetInput = document.getElementById("inputSueldo")
            resetInput.value = ""
            let resetFrm = document.getElementById("mostrarOpciones")
            resetFrm.innerHTML = ""
            mostrarContratos()
        } else {
            Swal.fire({
                title: `RUT: ${rut}, YA TIENE UN PLAN ASOCIADO, DESEA ACTUALIZAR SUS DATOS?`,
                text: "Actualizar?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: "Sí, Quiero Tomar este nuevo plan",
                cancelButtonText: "Cancelar",
            }).then(resultado => {
                if (resultado.value) {
                    // eliminamos contrato previo
                    let contratosStorage = JSON.parse(localStorage.getItem("contratosRealizados"))
                    let contratosArray = contratosStorage.findIndex(element => element.rut == rut)
                    contratosStorage.splice(contratosArray, 1)
                    contratosRealizados.splice(contratosArray, 1)
                    let contratosJson = JSON.stringify(contratosStorage)
                    localStorage.setItem("contratosRealizados", contratosJson)
                    //creamos contrato nuevo en caso de querer actualizar
                    let contratoCreado = new Contrato(contratosRealizados.length + 1, rut, nombre, edad, telefono, plan)
                    contratosRealizados.push(contratoCreado)
                    localStorage.setItem("contratosRealizados", JSON.stringify(contratosRealizados))
                    Swal.fire({
                        title: `FELICIDADES!`,
                        text: `Has Cambiado tu plan al ${plan} `
                    })
                    let reset = document.getElementById("crearContratoPlan")
                    reset.innerHTML = ""
                    let resetInput = document.getElementById("inputSueldo")
                    resetInput.value = ""
                    let resetFrm = document.getElementById("mostrarOpciones")
                    resetFrm.innerHTML = ""
                    mostrarContratos()
                }
            })

        }
    } else {
        Swal.fire({
            title: `UPS!`,
            text: `Debes Completar Todos los Campos para poder contratar un plan`
        })
    }

}
// muestra todos los contratos ya creados.
const mostrarContratos = async () => {
    resetear()
    let divMostrar = document.getElementById("mostrarContratos")
    if (contratosRealizados.length > 0) {
        divMostrar.innerHTML = ""
        contratosRealizados.forEach((contra) => {

            let dvMostrar = document.createElement("div")
            dvMostrar.className = "col-lg-3 col-md-6 mb-5 mb-lg-0"
            dvMostrar.innerHTML = `<br>
        <span class="service-icon rounded-circle mx-auto mb-3"><i class="icon-screen-smartphone"></i></span>
        <h4><strong>Contrato de: ${contra.nombre}</strong></h4>
        <p class="text-faded mb-0"><strong>Rut: ${contra.rut}</strong></p>
        <p class="text-faded mb-0"><strong>Edad: ${contra.edad}</strong></p>
        <p class="text-faded mb-0"><strong>Telefono: ${contra.telefono}<strong></p>
        <p class="text-faded mb-0"><strong>PLAN CONTRATADO: ${contra.planAsociado}<strong></p>
        <button type="button" class="btn btn-secondary btn-lg" id="${contra.id}">Eliminar Plan</button>
        </div>`
            divMostrar.appendChild(dvMostrar)
            let btnEliminar = document.getElementById(`${contra.id}`)
            btnEliminar.addEventListener("click", eliminarContrato)

        })
    } else {
        divMostrar.innerHTML = ""
        Swal.fire({
            title: `UPS!`,
            text: `No Existen Planes Contratados, Prueba Contratar Uno!`
        })
    }
}
//Funciona para Eliminar contrato seleccionado
function eliminarContrato(evt) {

    let idBoton = evt.target.id
    Swal.fire({
        title: `Eliminar Contrato ID: ${idBoton}`,
        text: "¿Eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then(resultado => {
        if (resultado.value) {
            let contratosStorage = JSON.parse(localStorage.getItem("contratosRealizados"))
            let contratosArray = contratosStorage.findIndex(element => element.id == idBoton)
            contratosStorage.splice(contratosArray, 1)
            contratosRealizados.splice(contratosArray, 1)
            let contratosJson = JSON.stringify(contratosStorage)
            localStorage.setItem("contratosRealizados", contratosJson)
            mostrarContratos()
        }
    })

}
//Funciones para mostrar y ocultar informacion usando el mismo boton.
function resetear() {
    let divOpciones = document.getElementById("mostrarOpciones")
    divOpciones.innerHTML = ""
    let divFormContrato = document.getElementById("crearContratoPlan")
    divFormContrato.innerHTML = ""
    let divPlanes = document.getElementById("mostrarPlanes")
    divPlanes.innerHTML = ""
    let sueldo = document.getElementById("inputSueldo")
    sueldo.value = ""
    let divContratos = document.getElementById("mostrarContratos")
    divContratos.innerHTML = ""
}
function muestraPlanes() {
    divPlanes = document.getElementById("mostrarPlanes")
    if (divPlanes.innerHTML == "") {
        planesDisponibles()
    }
    else {
        divPlanes.innerHTML = ""
    }
}
function muestraContratos() {
    let divContratos = document.getElementById("mostrarContratos")
    if (divContratos.innerHTML == "") {
        mostrarContratos()
    } else {
        divContratos.innerHTML = ""
    }
}
const mostrarFormCreacion = async () => {
    divCreacion = document.getElementById("crearPlanes")
    if (divCreacion.innerHTML == "") {
        cargarMenuCreacion()
    }
    else {
        divCreacion.innerHTML = ""
    }
}
//Seccion HTML index
let cargaPlanes = document.getElementById("cargarPlanes")
cargaPlanes.addEventListener("click", muestraPlanes)
let verOpciones = document.getElementById("inputSueldo")
verOpciones.addEventListener("change", verOpcionesPlanes)
verOpciones.addEventListener("focus", resetear)
let btnMostrarContratos = document.getElementById("cargarContratos")
btnMostrarContratos.addEventListener("click", muestraContratos)

