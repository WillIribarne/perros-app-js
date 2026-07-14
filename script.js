const estado = {
    raza: "",
    fotos: []
}

const contenedor = document.getElementById('contenedor-resultados')
const botonBuscar = document.getElementById("botonBuscar")
const inputRaza = document.getElementById("inputRaza")

const render = () => {
    limpiarPerritos();
    buscarPerritos(inputRaza.value);
        estado.fotos.forEach(urlFoto => {
        const img = document.createElement('img');
        img.src = urlFoto;
        contenedor.appendChild(img);
    });
}

const buscarPerritos = (raza) => {
    estado.raza = raza; // Guardamos el texto directo en el estado
    
    estado.fotos = [
        'https://images.dog.ceo/breeds/retriever-golden/n02099601_2440.jpg',
        'https://images.dog.ceo/breeds/retriever-golden/n02099601_4312.jpg',
        'https://images.dog.ceo/breeds/retriever-golden/n02099601_4651.jpg'
    ];
}

const limpiarPerritos = () => {
    contenedor.innerHTML = ''
    estado.fotos.splice(0) //elimina todas las fotos - es como asignar [] pero con mayor lentitud y sin descuidar la memoria (imaginando que js no tiene un garbagecollector...)
}

botonBuscar.addEventListener("click", render)