//Objetos necesarios
class Persona {
    constructor(id, nombre, edad, sueldo, telefono) {
        this.id = id,
        this.nombre = nombre,
        this.edad = edad,
        this.sueldo = sueldo
        this.telefono = telefono,
        this.prima = this.sueldo * 0.07

    }
    obtenerId() {
        return this.id
    }
    obtenerNombre() {
        return this.nombre
    }
    obtenerPrima() {
        return this.prima
    }

    obtenerEdad() {
        return this.edad
    }
    obtenerTelefono() {
        return this.telefono
    }
}

class Plan {
    constructor(id,nombre, caracteristicas, costo) {
        this.id = id,
        this.nombre = nombre,
        this.caracteristicas = caracteristicas,
        this.costo = costo
    }
    mostrarId(){
        return this.id
    }
    mostrarPlanes() {
        alert(`Nombre del Plan: ${this.nombre}, Tipo de Plan: ${this.caracteristicas}, Valor del Plan: ${this.costo}`)
    }
    devolverCosto() {
        return this.costo
    }
    devolverNombre() {
        return this.nombre
    }
    devolverCaracteristicas() {
        return this.caracteristicas
    }

}

class Contratado {
    constructor(idAfiliado, nombreAfiliado, planAsociado) {
        this.idAfiliado = idAfiliado,
            this.nombreAfiliado = nombreAfiliado,
            this.planAsociado = planAsociado
    }
    obtenerinfoAfiliado() {
        alert(`Contrato N° ${this.idAfiliado} Nombre Afiliado: ${this.nombreAfiliado} Plan Contratado: ${this.planAsociado}`)
    }
}
//Variables
let salir
const personas = []
const carteraPlanes = []
const contratos = []
const plan1 = new Plan(1,"A", "Full Cobertura", 8000)
const plan2 = new Plan(2,"B", "Cobertura SemiFull", 4000)
const plan3 = new Plan(3,"C", "Cobertura Basica", 3000)
carteraPlanes.push(plan1, plan2, plan3)


//------------------------------------------------------------------------------
//Funciones
function crearPlan() {
    let nom = document.getElementById("nombre")
    let carac = document.getElementById("caracteristica")
    let costo = document.getElementById("costo")
    let plan = new Plan(carteraPlanes.length+1,nom.value, carac.value, costo.value)
    carteraPlanes.push(plan)
    let selec = document.getElementById("dvCreacion")
    let mensaje = document.createElement("h3")
    mensaje.innerText = "Plan Creado!"
    selec.appendChild(mensaje)
    nom.value = ""
    carac.value = ""
    costo.value = ""



}
function planesDisponibles() {
    let divSeleccion = document.getElementById("seleccion")
    divSeleccion.innerHTML = ""
    carteraPlanes.forEach((carteraPlanes) => {
        let mostrarPlanes = document.createElement("div")
        mostrarPlanes.innerHTML = `<div id="">
                                        <p>ID: ${carteraPlanes.id}</p>
                                        <p>Nombre: ${carteraPlanes.devolverNombre()}</p>
                                        <p>Cobertura: ${carteraPlanes.devolverCaracteristicas()}</p>
                                        <p>Costo: ${carteraPlanes.devolverCosto()}</p>
                                    </div>`
        divSeleccion.append(mostrarPlanes)
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
let btnCrearPlan = document.getElementById("crearPlan")
btnCrearPlan.addEventListener("click", crearMenuCreacionPlan)

let btnVerPlanes = document.getElementById("verPlanes")
btnVerPlanes.addEventListener("click", planesDisponibles)

let btnCotizar = document.getElementById("cotizarPlan")
btnCotizar.addEventListener("click", crearMenuCotizante)

let btnVerCotizantes = document.getElementById("verCotizantes")
btnVerCotizantes.addEventListener("click", verCotizantes)

let btnVerContratados = document.getElementById("verContratos")
btnVerContratados.addEventListener("click",verContratados)

