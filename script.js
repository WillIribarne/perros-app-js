const estado = {
    raza: "",
    fotos: []
}

const contenedor = document.getElementById('contenedor-resultados')

const render = (estado) => estado.fotos.forEach(foto => {
    const img = document.createElement('img');
    img.src = foto;
    contenedor.appendChild(img);
});

const limpiarPerritos = () => contenedor.innerHTML = ''

const buscarPerritos = (raza) => {
    estado.raza = raza; // Guardamos el texto directo en el estado
    
    estado.fotos = [
        'https://images.dog.ceo/breeds/retriever-golden/n02099601_2440.jpg',
        'https://images.dog.ceo/breeds/retriever-golden/n02099601_4312.jpg',
        'https://images.dog.ceo/breeds/retriever-golden/n02099601_4651.jpg'
    ];
    
    render(estado);
}