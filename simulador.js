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
    constructor(nombre, caracteristicas, costo) {
        this.nombre = nombre,
            this.caracteristicas = caracteristicas,
            this.costo = costo
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
const plan1 = new Plan("A", "Full Cobertura", 120000)
const plan2 = new Plan("B", "Cobertura SemiFull", 80000)
const plan3 = new Plan("C", "Cobertura Basica", 40000)
carteraPlanes.push(plan1, plan2, plan3)


//------------------------------------------------------------------------------
//Funciones
function planesDisponibles(plan) {

    plan.forEach((carteraPlanes) => { carteraPlanes.mostrarPlanes() })
}

function verCotizantes(pers) {
    if (pers.length == 0) {
        alert("No Hemos Encontrado Cotizantes")
    } else {
        pers.forEach((personas) => { alert(`El Cotizante numero: ${personas.obtenerId()} es ${personas.obtenerNombre()}`) })
    }

}

function verContratados(cont) {
    if (cont.length == 0) {
        alert("No Hemos Encontrado Contratos")
    } else {
        cont.forEach((contratos) => { contratos.obtenerinfoAfiliado() })
    }
}

function calcularExcedentes(valorPlan, primaCotizante) {
    let excedentes = (primaCotizante - valorPlan) * -1
    return excedentes;


}

function cotizarPlan(pers) {

    let nombre = prompt("Ingresa tu nombre")
    let edad = parseInt(prompt("Ingresa tu Edad"))
    let sueldo = parseFloat(prompt("Ingresa tu Sueldo"))
    let telefono = prompt("Ingresa tu Telefono")
    let personaCreada = new Persona(personas.length + 1, nombre, edad, sueldo, telefono)
    pers.push(personaCreada)
    return personaCreada
}

function verOpcionesDePlanes(plan, pers) {
    
    plan.forEach((carteraPlanes) => {

        if (pers.obtenerPrima() >= carteraPlanes.devolverCosto()) {
            alert(`Hola ${pers.obtenerNombre()} Con tu prima mensual puedes optar al siguiente Plan: ${carteraPlanes.devolverNombre()}, ${carteraPlanes.devolverCaracteristicas()}, Ademas tu Prima Genera: ${calcularExcedentes(pers.obtenerPrima(), carteraPlanes.devolverCosto())} en Excedentes`)
            let respuesta = prompt(`Deseas Contratar Plan: ${carteraPlanes.devolverNombre()} SI o NO`)
            if (respuesta.toLocaleLowerCase() === "si") {

                let contratar = new Contratado(contratos.length + 1, pers.obtenerNombre(), carteraPlanes.devolverNombre())
                contratos.push(contratar)
                alert(`Bienvenido a nuestra Empresa ${pers.obtenerNombre()}, Acabas de Contratar el Plan ${carteraPlanes.devolverNombre()}`)

            } else {
                alert("Hasta Luego!")
            }
        }
        else if (pers.obtenerPrima() < carteraPlanes.devolverCosto()) {
            alert(`Plan: ${carteraPlanes.devolverNombre()}, no Disponible para tu Prima Mensual`)
        }
    })
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



function mostrarMenu() {
    let opcion = parseInt(prompt(`Ingrese el número de la opción que desea realizar:
                        1 - Ver Planes Disponibles
                        2 - Cotizar Plan
                        3 - Ver Cotizantes
                        4 - Ver Contratados
                        5 - Buscar Contrato
                        6 - Eliminar Contrato
                        0 - Para salir
                        `))
    menu(opcion)
}

function menu(opcion) {
    switch (opcion) {
        case 0:
            salir = true
            alert("Que tengas buen dia")
            break
        case 1:
            planesDisponibles(carteraPlanes)
            break
        case 2:
            let pers = cotizarPlan(personas)
            if (pers.obtenerEdad() >= 18) {
                
                verOpcionesDePlanes(carteraPlanes, pers)

            }
            else {
                alert("Debes ser mayor de 18 años para cotizar un Plan")
            }
            break
        case 3:
            verCotizantes(personas)
            
            break
        case 4:
            verContratados(contratos)
            break
        case 5:
            buscarContrato(contratos)
            break
        case 6:
            eliminarContrato(contratos)
            break
        default:
            alert("ingrese una opcion del Menu")
    }

}
//-------------------------------------------------------------------------------------
//Simulador
while (salir != true) {
    mostrarMenu()
}
