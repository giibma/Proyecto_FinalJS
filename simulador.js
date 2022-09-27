//Objetos necesarios
class Plan {
    constructor(id, nombre, cobertura, caracteristicas, costo) {
        this.id = id,
            this.nombre = nombre,
            this.cobertura = cobertura,
            this.caracteristicas = caracteristicas,
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
    devolverCaracteristicas() {
        return this.caracteristicas
    }


}

class Contrato {
    constructor(nombre, edad, telefono, planAsociado) {
        this.nombre = nombre,
            this.edad = edad,
            this.telefono = telefono,
            this.planAsociado = planAsociado
    }
}
class Evento {
    constructor(evento1, evento2, evento3, evento4, evento5) {
        this.evento1 = evento1,
            this.evento2 = evento2,
            this.evento3 = evento3,
            this.evento4 = evento4,
            this.evento5 = evento5
    }
    devolverEventos(tipoPlan) {
        if (tipoPlan === "Full Cobertura") {
            return [this.evento1, this.evento2, this.evento3, this.evento4, this.evento5]
        } else if (tipoPlan === "Cobertura SemiFull") {
            return [this.evento1, this.evento2, this.evento3, this.evento4]
        } else if (tipoPlan === "Cobertura Intermedia") {
            return [this.evento1, this.evento2, this.evento3]
        } else if (tipoPlan === "Cobertura Basica") {
            return [this.evento1, this.evento2]
        } else {
            return this.evento1
        }

    }

}
//Variables
let contratos = []
const carteraPlanes = []
const plan1 = new Plan(1, "Plan Premium Full", "Full Cobertura", "Contra TODO Evento", 15000)
const plan2 = new Plan(2, "Plan Premium Semi", "Cobertura SemiFull", "Contra Casi Todo Evento", 9000)
const plan3 = new Plan(3, "Plan Intermedio", "Cobertura Intermedia", "Contra Algunos Eventos", 6000)
const plan4 = new Plan(4, "Plan Basico", "Cobertura Basica", "Contra varios eventos menos..", 3000)
let events = new Evento("Choques", "Caidas", "Mordedura", "Explosion", "Evacuacion")
carteraPlanes.push(plan1, plan2, plan3, plan4)
if(localStorage.getItem("contratos")){
    contratos = JSON.parse(localStorage.getItem("contratos"))
}else{
 
    let contrato1 = new Contrato("wesker","30","123","Plan Premium Full")
    contratos.push(contrato1)
    localStorage.setItem("contratos",JSON.stringify(contratos))
}
localStorage.setItem("contratos",JSON.stringify(contratos))

//------------------------------------------------------------------------------
//Funciones
function planesDisponibles() {
    let divSeleccion = document.getElementById("mostrarPlanes")
    divSeleccion.innerHTML = ""
    carteraPlanes.forEach((carteraPlanes) => {
        const mostrarPlanes = document.createElement("div")
        mostrarPlanes.className = "col-lg-3 col-md-6 mb-5 mb-lg-0"
        mostrarPlanes.innerHTML = `
            <span class="service-icon rounded-circle mx-auto mb-3"><i class="icon-screen-smartphone"></i></span>
            <h4><strong>${carteraPlanes.nombre}</strong></h4>
            <p class="text-faded mb-0"><strong>Cobertura: ${carteraPlanes.cobertura}</strong></p>
            <p class="text-faded mb-0"><strong>Costo: ${carteraPlanes.costo}<strong></p>
            <p class="text-faded mb-0"><strong>Caracteristicas: ${carteraPlanes.caracteristicas}<strong></p>
            <button type="button" class="btn btn-primary btn-lg" id="${carteraPlanes.id}">Ver Detalle</button>
    </div>`
        divSeleccion.appendChild(mostrarPlanes)
        let btnDetalle = document.getElementById(`${carteraPlanes.id}`)
        btnDetalle.addEventListener("click", verDetallePlan)
    })
}
function verDetallePlan(evt) {

    let id = evt.target.id
    let plan = carteraPlanes.find(function (element) {

        return element.mostrarId() === parseInt(id)

    })
    let sueldoSugerido = Math.round(((plan.devolverCosto() * 100) / 0.07) / 100)
    Swal.fire({
        title: `${plan.cobertura}`,
        icon: `info`,
        html: `<h4>Cobertura Contra:<h4>
                <p>${events.devolverEventos(plan.cobertura)}<p>
                <p>Sueldo Sugerido: ${sueldoSugerido}<p>`


    })

}
function verOpcionesPlanes() {
    let sueldo = document.getElementById("inputSueldo").value
    let prima = sueldo * 0.07
    let divSeleccion = document.getElementById("mostrarOpciones")
    divSeleccion.innerHTML = ""
    carteraPlanes.forEach((carteraPlanes) => {
        if (prima >= carteraPlanes.costo)
         {
            let mostrarPlan = document.createElement("div")
            mostrarPlan.className = "col-lg-3 col-md-6 mb-5 mb-lg-0"
            mostrarPlan.innerHTML = `
            <span class="service-icon rounded-circle mx-auto mb-3"><i class="icon-screen-smartphone"></i></span>
            <h4><strong>${carteraPlanes.nombre}</strong></h4>
            <p class="text-faded mb-0"><strong>Cobertura: ${carteraPlanes.cobertura}</strong></p>
            <p class="text-faded mb-0"><strong>Costo: ${carteraPlanes.costo}<strong></p>
            <button type="button" class="btn btn-primary btn-lg" id="${carteraPlanes.id}">Contratar Plan!</button>
            </div>`
            divSeleccion.appendChild(mostrarPlan)
            let btnContrato = document.getElementById(`${carteraPlanes.id}`)
            btnContrato.addEventListener("click", formCrearContrato)
            
        } 
        else if (prima < carteraPlanes.costo) 
        {
            let mostrarPlan = document.createElement("div")
            mostrarPlan.className = "col-lg-3 col-md-6 mb-5 mb-lg-0"
            mostrarPlan.innerHTML = `
            <span class="service-icon rounded-circle mx-auto mb-3"><i class="icon-screen-smartphone"></i></span>
            <h4><strong>${carteraPlanes.nombre}</strong></h4>
            <p class="text-faded mb-0"><strong>Cobertura: ${carteraPlanes.cobertura}</strong></p>
            <p class="text-faded mb-0"><strong>Costo: ${carteraPlanes.costo}<strong></p>
            <button type="button" class="btn btn-primary btn-lg" id="${carteraPlanes.id}" disabled>No Disponible</button>
            </div>`
            divSeleccion.appendChild(mostrarPlan)

        }
    })

}

function formCrearContrato(evt) {

    let id = evt.target.id
    let plan = carteraPlanes.find(function (element) {

        return element.mostrarId() === parseInt(id)

    })
    let divForm = document.getElementById("crearContratoPlan")
    divForm.innerHTML = ""
    let div = document.createElement("div")
    div.className = `<div class="mb-3">`
    div.innerHTML = `   <br>
                        <h1 id="nombrePlan">${plan.nombre}</h1>
                        <br>   
                        <label for="formularioCreacionContrato" class="form-label">Ingresa tu Nombre</label>
                        <input type="text" class="form-control" id="nombre" placeholder="Nombre Completo">
                    </div>
                    <div class="mb-3">
                        <label for="formularioCreacionContrato" class="form-label">Ingresa tu Edad</label>
                        <input type="text" class="form-control" id="edad" placeholder="Ingresa tu Edad">
                    </div>
                    <div class="mb-3">
                        <label for="formularioCreacionContrato" class="form-label">Ingresa tu telefono</label>
                        <input type="text" class="form-control" id="telefono" placeholder="Ingresa tu Telefono">
                        
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn btn-primary btn-lg" id="contratarPlan">Contratar Plan!</button>
                    </div>
                   `
    divForm.appendChild(div)
    let btnContratar = document.getElementById("contratarPlan")
    btnContratar.addEventListener("click", crearContrato)

}
function crearContrato() {
    let nombre = document.getElementById("nombre").value
    let edad = document.getElementById("edad").value
    let telefono = document.getElementById("telefono").value
    let plan = document.getElementById("nombrePlan").innerText
    let contratoCreado = new Contrato(nombre, edad, telefono, plan)
    console.log(contratoCreado)
    contratos.push(contratoCreado)
    localStorage.setItem("contratos", JSON.stringify(contratos))
    Swal.fire({
        title:`FELICIDADES!`,
        text:`Has Contratado el ${plan} `
    })
    let reset = document.getElementById("crearContratoPlan")
    reset.innerHTML=""
}

function mostrarContratos() {
    let divMostrarPlanes = document.getElementById("mostrarContratos")
    divMostrarPlanes.innerHTML = ""
    contratos.forEach((contra)=>{
        if(contratos.length <= 0){
            Swal.fire({
                title: `UPS`,
                icon: `info`,
                html: `<h1>No Existen Contratos Aun</h1>`
        
        
            })

        }else{
            dvMostrar = document.createElement("div")
            dvMostrar.className="col-lg-3 col-md-6 mb-5 mb-lg-0"
            dvMostrar.innerHTML=`<br>
            <span class="service-icon rounded-circle mx-auto mb-3"><i class="icon-screen-smartphone"></i></span>
            <h4><strong>Contrato de: ${contra.nombre}</strong></h4>
            <p class="text-faded mb-0"><strong>Edad: ${contra.edad}</strong></p>
            <p class="text-faded mb-0"><strong>Telefono: ${contra.telefono}<strong></p>
            <p class="text-faded mb-0"><strong>PLAN CONTRATADO: ${contra.planAsociado}<strong></p>
            
            </div>`
            divMostrarPlanes.appendChild(dvMostrar)
        }
    })
     
        

}


//Creaciones HTML Menu
let cargaPlanes = document.getElementById("cargarPlanes")
cargaPlanes.addEventListener("click", planesDisponibles)
let verOpciones = document.getElementById("inputSueldo")
verOpciones.addEventListener("change", verOpcionesPlanes)
let btnMostrarContratos = document.getElementById("cargarContratos")
btnMostrarContratos.addEventListener("click", mostrarContratos)