//Variables
let salir
const personas = []

//Objetos necesarios
class Persona {
    constructor(nombre, edad, sueldo) {

        this.nombre = nombre,
        this.edad = edad,
        this.sueldo = sueldo
        this.prima = this.sueldo * 0.07
    }
    obtenerNombre(){
        return this.nombre
    }
    obtenerPrima() {
        return this.prima
    }

    obtenerEdad() {
        return this.edad
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
    devolverCaracteristicas(){
        return this.caracteristicas
    }

}

const plan1 = new Plan("A", "Full Cobertura", 120000)
const plan2 = new Plan("B", "Cobertura SemiFull", 80000)
const plan3 = new Plan("C", "Cobertura Basica", 40000)
const carteraPlanes = []
carteraPlanes.push(plan1, plan2, plan3)

//------------------------------------------------------------------------------
//Funciones
function planesDisponibles(plan) {
    alert(
        plan.forEach((carteraPlanes) => {
            carteraPlanes.mostrarPlanes()
        }))
}

function calcularExcedentes(valorPlan,primaCotizante){
    let excedentes = (primaCotizante-valorPlan)*-1
    return excedentes;
    
    
}

function cotizarPlan() {
    let nombre = prompt("Ingresa tu nombre")
    let edad = parseInt(prompt("Ingresa tu Edad"))
    let sueldo = parseFloat(prompt("Ingresa tu Sueldo"))
    let personaCreada = new Persona(nombre, edad, sueldo)
    personas.push(personaCreada)
    return personaCreada
}

function verOpcionesDePlanes(plan, prima) {
    console.log(plan, prima)
    plan.forEach((carteraPlanes) => {

        if (prima >= carteraPlanes.devolverCosto()) {
            alert(`Con tu prima mensual puedes optar al siguiente Plan: ${carteraPlanes.devolverNombre()}, ${carteraPlanes.devolverCaracteristicas()}, Ademas tu Prima Genera: ${calcularExcedentes(prima,carteraPlanes.devolverCosto())} en Excedentes`)
            
        }
        else if (prima < carteraPlanes.devolverCosto()) {
            alert(`Plan: ${carteraPlanes.devolverNombre()}, no Disponible para tu Prima Mensual`)
        }
    })
}




function mostrarMenu() {
    let opcion = parseInt(prompt(`Ingrese el número de la opción que desea realizar:
                        1 - Ver Planes Disponibles
                        2 - Cotizar Plan
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
            let pers = cotizarPlan()
            if (pers.obtenerEdad() >= 18) {
                console.log(pers)
                verOpcionesDePlanes(carteraPlanes,pers.obtenerPrima())

            }
            else {
                alert("Debes ser mayor de 18 años para cotizar un Plan")
            }
            break

    }

}
//-------------------------------------------------------------------------------------
//Simulador
while (salir != true) {
    mostrarMenu()
}
