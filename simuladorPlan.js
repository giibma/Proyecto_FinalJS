//Funciones
function calcularPorcentaje(renta) {
    let prima = renta * 0.07
    return parseFloat(prima)
}
//calcula el alza dentro de los proximos 5 años
function calcularAlza(costo){
    let alzaAnual = 0.03
    let totalAnual= 0;
    let valorFinal= 0
    for(i=1; i <= 5;i++){

        totalAnual += costo*alzaAnual
        valorFinal = costo+totalAnual
        alert(`Tu Plan subira dentro de ${i} años a ${valorFinal} `)
    }

}
function calcularDiferencia(seleccion,prima){
   let plan = seleccion;
   let costo
   
   switch(plan.toLowerCase()){
    case "a":
        costo = 60000
        diferencia = costo-prima
        if(diferencia < 0){
            let dif = diferencia*-1
            alert(`Tu Prima Mensual supera en ${dif} el costo del plan, por lo cual generaras excedentes!`)
        }else{
            alert(`Tu Prima Mensual es menor que el Costo de tu Plan, deberas pagar un extra de ${diferencia}`)
        }
        calcularAlza(costo)
        break;
    case "b":
        costo = 100000
        diferencia = costo-prima
        if(diferencia < 0){
            let dif = diferencia*-1
            alert(`Tu Prima Mensual supera en ${dif} el costo del plan, por lo cual generaras excedentes!`)
        }else{
            alert(`Tu Prima Mensual es menor que el Costo de tu Plan, deberas pagar un extra de ${diferencia}`)
        }
        calcularAlza(costo)
        break;
    case "c":
        costo = 80000
        diferencia = costo-prima
        if(diferencia < 0){
            let dif = diferencia*-1
            alert(`Tu Prima Mensual supera en ${dif} el costo del plan, por lo cual generaras excedentes!`)
        }else{
            alert(`Tu Prima Mensual es menor que el Costo de tu Plan, deberas pagar un extra de ${diferencia}`)
        }
        calcularAlza(costo)
        break;
    case "d":
        costo = 120000
        diferencia = costo-prima
        if(diferencia < 0){
            let dif = diferencia*-1
            alert(`Tu Prima Mensual supera en ${dif} el costo del plan, por lo cual generaras excedentes!`)
        }else{
            alert(`Tu Prima Mensual es menor que el Costo de tu Plan, deberas pagar un extra de ${diferencia}`)
        }
        calcularAlza(costo)
        break;
   }
    
}


//Simulador
alert("Bienvenido a Simula tu Plan de Salud")
let edad = parseInt(prompt("Ingresa tu Edad"))
if (edad >= 18) {
    let prima = calcularPorcentaje(parseFloat(prompt("Ingresa tu Renta Mensual")))
    alert(`Tu prima mensual es de ${prima}`)
    let genero = prompt("Cuentanos eres hombre o mujer?")
    if( genero.toLocaleLowerCase() == "hombre" || genero.toLowerCase() == "mujer")
    {
        switch(genero.toLowerCase()){
            case "hombre":
                opcion =prompt("Para Varones tenemos los planes A(Valor 60.000), Plan B(Valor 100.000), ingresa una opcion")
                
                    calcularDiferencia(opcion,prima)
                
                break;
            case "mujer":
                opcion =prompt("Para Mujeres tenemos los planes C(Valor 80.000), Plan D(Valor 120.000), ingresa una opcion")
                
                    calcularDiferencia(opcion,prima)
                
        }
    }else{
        
        alert("Ingresa una opcion valida")
    }

}
else {
    alert("Debes tener mas de 18 años para poder cotizar un plan con nosotros")
}
