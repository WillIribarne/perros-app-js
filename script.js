const estado = {
    raza: "",
    fotos: []
}

const contenedor = document.getElementById('contenedor-resultados')
const botonBuscar = document.getElementById("botonBuscar")
const inputRaza = document.getElementById("inputRaza")

const render = async () => {
    contenedor.innerHTML = ''
    await buscarPerritos(inputRaza.value);
        estado.fotos.forEach(urlFoto => {
        const img = document.createElement('img');
        img.src = urlFoto;
        contenedor.appendChild(img);
    });
}

async function buscarPerritos(raza) {
  const url = `https://dog.ceo/api/breed/${raza.toLowerCase().trim()}/images/random`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json(); // no se va a ejecutar esta linea hasta que haya terminado la anterior
    
    const urlFoto = datos.message;
    estado.fotos.push(urlFoto);
    
  } catch (error) {
    console.error("No se pudo obtener la foto");
  }
}

const limpiarPerritos = () => {
    contenedor.innerHTML = ''
    estado.fotos.splice(0) //elimina todas las fotos - es como asignar [] pero con mayor lentitud y sin descuidar la memoria (imaginando que js no tiene un garbagecollector...)
}

botonBuscar.addEventListener("click", render)
botonLimpiar.addEventListener("click", limpiarPerritos)