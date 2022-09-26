//Objetos necesarios
class Plan {
    constructor(id,nombre, cobertura,caracteristicas,costo) {
        this.id = id,
        this.nombre = nombre,
        this.cobertura = cobertura,
        this.caracteristicas = caracteristicas,
        this.costo = costo
        
    }
    mostrarId(){
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
    devolverCaracteristicas(){
        return this.caracteristicas
    }
    

}

class Contrato {
    constructor(idAfiliado, nombreAfiliado, planAsociado) {
        this.idAfiliado = idAfiliado,
        this.nombreAfiliado = nombreAfiliado,
        this.planAsociado = planAsociado
    }
}
class Evento{
    constructor(evento1,evento2,evento3,evento4,evento5){
        this.evento1 = evento1,
        this.evento2 = evento2,
        this.evento3 = evento3,
        this.evento4 = evento4,
        this.evento5 = evento5
    }
        devolverEventos(tipoPlan){
            if(tipoPlan === "Full Cobertura"){
                return [this.evento1,this.evento2,this.evento3,this.evento4,this.evento5]
            }else if(tipoPlan === "Cobertura SemiFull"){
                return [this.evento1,this.evento2,this.evento3,this.evento4]
            }else if(tipoPlan === "Cobertura Intermedia"){
                return [this.evento1,this.evento2,this.evento3]
            }else if(tipoPlan === "Cobertura Basica"){
                return [this.evento1,this.evento2]
            }else{
                return this.evento1
            }

        }
    
}
//Variables
const carteraPlanes = []
const contratos = []
const plan1 = new Plan(1,"Plan Premium Full", "Full Cobertura","Contra TODO Evento",15000)
const plan2 = new Plan(2,"Plan Premium Semi", "Cobertura SemiFull","Contra Casi Todo Evento", 9000)
const plan3 = new Plan(3,"Plan Intermedio", "Cobertura Intermedia","Contra Algunos Eventos", 6000)
const plan4 = new Plan(4,"Plan Basico", "Cobertura Basica","Contra varios eventos menos..", 3000)
let events = new Evento("Choques","Caidas","Mordedura","Explosion","Evacuacion")
carteraPlanes.push(plan1, plan2, plan3,plan4)


//------------------------------------------------------------------------------
//Funciones
function crearPlan() {
   

}
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
        btnDetalle.addEventListener("click",verDetallePlan)
    })
}
function verDetallePlan(evt){
    
    let id = evt.target.id
    let plan = carteraPlanes.find(function (element){
        
        return element.mostrarId() === parseInt(id)
        
    })
    let sueldoSugerido = Math.round(((plan.devolverCosto()*100)/0.07)/100)
    Swal.fire({
        title: `${plan.cobertura}`,
        icon: `info`,
        html: `<h4>Cobertura Contra:<h4>
                <p>${events.devolverEventos(plan.cobertura)}<p>
                <p>Sueldo Sugerido: ${sueldoSugerido}<p>`
              
        
    })
    
}
function verOpcionesPlanes(){
    let sueldo = document.getElementById("inputSueldo").value
    let prima = sueldo*0.07
    console.log(prima)
    let divSeleccion = document.getElementById("mostrarOpciones")
    divSeleccion.innerHTML=""
    carteraPlanes.forEach((carteraPlanes)=>{
        if(prima >= carteraPlanes.costo){
            let mostrarPlan = document.createElement("div")
            mostrarPlan.className="col-lg-3 col-md-6 mb-5 mb-lg-0"
            mostrarPlan.innerHTML=`
            <span class="service-icon rounded-circle mx-auto mb-3"><i class="icon-screen-smartphone"></i></span>
            <h4><strong>${carteraPlanes.nombre}</strong></h4>
            <p class="text-faded mb-0"><strong>Cobertura: ${carteraPlanes.cobertura}</strong></p>
            <p class="text-faded mb-0"><strong>Costo: ${carteraPlanes.costo}<strong></p>
            <button type="button" class="btn btn-primary btn-lg" id="${carteraPlanes.id}">Contratar Plan!</button>
            </div>`
            divSeleccion.appendChild(mostrarPlan)
        }else if(prima < carteraPlanes.costo){
            let mostrarPlan = document.createElement("div")
            mostrarPlan.className="col-lg-3 col-md-6 mb-5 mb-lg-0"
            mostrarPlan.innerHTML=`
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

function cotizarPlan() {

    let nombre = document.getElementById("nombre")
    let edad = document.getElementById("edad")
    let sueldo = document.getElementById("sueldo")
    let telefono = document.getElementById("telefono")
    let personaCreada = new Persona(personas.length + 1, nombre.value, edad.value, sueldo.value, telefono.value)
    personas.push(personaCreada)
    let prim = document.createElement("h4")
    prim.innerHTML = `Tu Prima es ${personaCreada.prima}`
    selec = document.getElementById("dvCotizar")
    selec.appendChild(prim)
    carteraPlanes.forEach((carteraPlanes) => {
        if (carteraPlanes.costo <= personaCreada.prima) {
            let mostrarPlanes = document.createElement("div")
            mostrarPlanes.innerHTML = `<div id="divPlan">
                                        <h3> Plan Disponible para tu Prima!</h3>
                                        <p id="${carteraPlanes.nombre}">Nombre: ${carteraPlanes.nombre} </p>
                                        <p>Cobertura: ${carteraPlanes.caracteristicas} </p>
                                        <p>Costo: ${carteraPlanes.costo}</p>
                                        <p>Excedentes: ${personaCreada.prima-carteraPlanes.costo} </p><br>
                                        <button id="${carteraPlanes.id}">Contratar Plan</button>
                                    </div>`
            selec.appendChild(mostrarPlanes)
            let btnContratar = document.getElementById(`${carteraPlanes.id}`)
            btnContratar.addEventListener("click", crearContrato)
            
            
        } else {

        }
     
        
    })

}

function crearContrato(evt) {
    console.log(evt)
    let id = evt.target.id
    console.log(id)
    let plan = carteraPlanes.find(function (element){
        console.log(element,id)
        return element.mostrarId() === parseInt(id)
        
    })
    console.log(plan)
    nomA = document.getElementById("nombre").value
    let contratar = new Contratado(contratos.length + 1, nomA, plan.devolverNombre())
    contratos.push(contratar)
    let selec = document.getElementById("divPlan")
    let mensaje = document.createElement("h3")
    mensaje.innerText = "Has Contratado un Plan!"
    selec.appendChild(mensaje)
    
}

function verCotizantes() {
    if (personas.length == 0) {
        let divSeleccion = document.getElementById("seleccion")
        divSeleccion.innerHTML = ""
        let mensaje = document.createElement("H3")
        mensaje.innerHTML = "No Existen Cotizantes Aun"
        divSeleccion.appendChild(mensaje)
    } else {
        personas.forEach((personas) => { alert(`El Cotizante numero: ${personas.obtenerId()} es ${personas.obtenerNombre()}`) })
    }

}

function verContratados() {
    if (contratos.length == 0) {
        alert("No Hemos Encontrado Contratos")
    } else {
        contratos.forEach((contratos) => { contratos.obtenerinfoAfiliado() })
    }
}
function buscarContrato(contr) {
    if (contr.length == 0) {
        alert("Aun no se han creado nuevos contratos, intenta cotizar y contratar uno")
    } else {
        let buscar = parseInt(prompt("Ingresa el Numero de Contrato que deseas buscar"))
        let busqueda = contratos.filter((contrato) => contrato.idAfiliado == buscar)
        if (busqueda.length == 0) {
            alert("No Hemos Encontrado este Contrato")
        } else {
            alert(`Hemos encontrado las siguientes coincidencias`)
            for (let contratoEncontrado of busqueda) {
                contratoEncontrado.obtenerinfoAfiliado()
            }
        }
    }


}

function eliminarContrato(contr) {

    if (contr.length == 0) {
        alert("No Existen Contratos para Eliminar")
    }
    else {
        let buscar = parseInt(prompt("Ingresa el Numero de Contrato que deseas Eliminar"))
        contratos.forEach(function (cont, index, obj) {
            if (cont.idAfiliado === buscar) {
                obj.splice(index, 1)
                alert(`Se ha Eliminado el contrato ${cont.idAfiliado} para el cliente: ${cont.nombreAfiliado}`)
            }
        })
    }


}

//Creaciones HTML Menu

function crearMenuCreacionPlan() {
    let divSeleccion = document.getElementById("seleccion")
    divSeleccion.innerHTML = ""
    let estructura = document.createElement("div")
    estructura.innerHTML = `<div id="dvCreacion">
                                <br>
                                <p>Nombre: <input id="nombre" type="text"> </p>
                                <p>Cobertura: <input id="caracteristica" type="text"> </p>
                                <p>Costo: <input id="costo" type="text"> </p>
                                <button id="crear">Crear Plan </button>
                            </div>`
    divSeleccion.appendChild(estructura)
    let btnCreacion = document.getElementById("crear")
    btnCreacion.addEventListener("click", crearPlan)

}

function crearMenuCotizante() {
    let divSeleccion = document.getElementById("seleccion")
    divSeleccion.innerHTML = ""
    let estructura = document.createElement("div")
    estructura.innerHTML = `<div id="dvCotizar">
                            <br>
                            <p>Nombre: <input id="nombre" type="text"> </p>
                            <p>Edad: <input id="edad" type="text"> </p>
                            <p>Sueldo: <input id="sueldo" type="text"> </p>
                            <p>Telefono: <input id="telefono" type="text"></p>
                            <button id="cotizar">Cotizar</button>
                            </div>`
    divSeleccion.appendChild(estructura)
    let btnCotizacion = document.getElementById("cotizar")
    btnCotizacion.addEventListener("click", cotizarPlan)

}
//Interaccion Doom y Eventos
/*let btnCrearPlan = document.getElementById("crearPlan")
btnCrearPlan.addEventListener("click", crearMenuCreacionPlan)

let btnVerPlanes = document.getElementById("verPlanes")
btnVerPlanes.addEventListener("click", planesDisponibles)

let btnCotizar = document.getElementById("cotizarPlan")
btnCotizar.addEventListener("click", crearMenuCotizante)

let btnVerCotizantes = document.getElementById("verCotizantes")
btnVerCotizantes.addEventListener("click", verCotizantes)

let btnVerContratados = document.getElementById("verContratos")
btnVerContratados.addEventListener("click",verContratados)
*/
let cargaPlanes = document.getElementById("cargarPlanes")
cargaPlanes.addEventListener("click",planesDisponibles)
let verOpciones = document.getElementById("inputSueldo")
verOpciones.addEventListener("change",verOpcionesPlanes)