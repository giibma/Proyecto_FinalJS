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
    constructor(idAfiliado, nombreAfiliado, planAsociado, generaExcedente) {
        this.idAfiliado = idAfiliado,
            this.nombreAfiliado = nombreAfiliado,
            this.planAsociado = planAsociado,
            this.generaExcedente = generaExcedente
    }
    obtenerinfoAfiliado() {
        alert(`Contrato N° ${this.idAfiliado} Nombre Afiliado: ${this.nombreAfiliado} Plan Contratado: ${this.planAsociado} Genera Excedentes? ${this.generaExcedente}`)
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
    alert(
        plan.forEach((carteraPlanes) => {
            carteraPlanes.mostrarPlanes()
        }))
}

function verCotizantes(pers) {
    alert(
        pers.forEach((personas) => {

            alert(`El Cotizante numero: ${personas.obtenerId()} es ${personas.obtenerNombre()}`)
        }))
}

function verContratados(cont){
    alert(
        cont.forEach((contratos) => {

            alert(contratos.obtenerinfoAfiliado())

        }
    ))
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
    console.log(personas)
    pers.push(personaCreada)
    return personaCreada
}

function verOpcionesDePlanes(plan, pers) {
    console.log(plan, pers)
    plan.forEach((carteraPlanes) => {

        if (pers.obtenerPrima() >= carteraPlanes.devolverCosto()) {
            alert(`Hola ${pers.obtenerNombre()} Con tu prima mensual puedes optar al siguiente Plan: ${carteraPlanes.devolverNombre()}, ${carteraPlanes.devolverCaracteristicas()}, Ademas tu Prima Genera: ${calcularExcedentes(pers.obtenerPrima(), carteraPlanes.devolverCosto())} en Excedentes`)
            let respuesta = prompt(`Deseas Contratar Plan: ${carteraPlanes.devolverNombre()} SI o NO`)
            if (respuesta.toLocaleLowerCase() === "si") {
                if (calcularExcedentes(pers.obtenerPrima(), carteraPlanes.devolverCosto()) > 0) {
                    let contratar = new Contratado(contratos.length + 1, pers.obtenerNombre(), carteraPlanes.devolverNombre(),true)
                    contratos.push(contratar)
                    alert(`Bienvenido a nuestra Empresa ${pers.obtenerNombre()}, Acabas de Contratar el Plan ${carteraPlanes.devolverNombre()}`)
                }
                else{
                    let contratar = new Contratado(contratos.length + 1, pers.obtenerNombre(), carteraPlanes.devolverNombre(),false)
                    contratos.push(contratar)
                    alert(`Bienvenido a nuestra Empresa ${pers.obtenerNombre()}, Acabas de Contratar el Plan ${carteraPlanes.devolverNombre()}`)
                }
            }else if(respuesta.toLocaleLowerCase() === "no"){
                alert("Hasta Luego!")
            }else{
                alert("ingresa una opcion valida")
            }
        }
        else if (pers.obtenerPrima() < carteraPlanes.devolverCosto()) {
            alert(`Plan: ${carteraPlanes.devolverNombre()}, no Disponible para tu Prima Mensual`)
        }
    })
}




function mostrarMenu() {
    let opcion = parseInt(prompt(`Ingrese el número de la opción que desea realizar:
                        1 - Ver Planes Disponibles
                        2 - Cotizar Plan
                        3 - Ver Cotizantes
                        4 - Ver Contratados
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
                console.log(pers)
                verOpcionesDePlanes(carteraPlanes, pers)

            }
            else {
                alert("Debes ser mayor de 18 años para cotizar un Plan")
            }
            break
        case 3:
            verCotizantes(personas)
            console.log(personas)
            break
        case 4:
            verContratados(contratos)
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
