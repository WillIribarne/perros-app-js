const estado = {
    raza: "",
    fotos: []
}

const contenedor = document.getElementById('contenedor-resultados')
const botonBuscar = document.getElementById("botonBuscar")
const inputRaza = document.getElementById("inputRaza")

const render = async () => { //es async porque requiere de buscarPerritos que es async
  await buscarPerritos(inputRaza.value)
  estado.fotos.forEach(urlFoto => {
    const img = document.createElement('img')
    img.src = urlFoto
    img.className = 'fotoPerro'
    contenedor.appendChild(img)
  });
}

async function buscarPerritos(raza) {
  limpiarContenedor();
  estado.fotos.splice(0) //elimina todas las fotos - es como asignar [] pero con mayor lentitud y sin descuidar la memoria (imaginando que js no tiene un garbagecollector...)
  const url = `https://dog.ceo/api/breed/${raza.toLowerCase().trim()}/images/random/8`

  try {
    const respuesta = await fetch(url)
    const datos = await respuesta.json() // no se va a ejecutar esta linea hasta que haya terminado la anterior "concatenación de awaits"
    const urlFotos = datos.message //datos es un json {message:array[8], status:success}
    estado.fotos.push(...urlFotos) // ... "spread operator" - desparrama ese array[8] correctamente
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (error) {
    console.error("No se han podido obtener fotos")
    const err = document.createElement('p')
    err.className = 'mensajeError'
    err.textContent = 'No se han podido obtener fotos'
    contenedor.appendChild(err)
  }
}

const limpiarContenedor = () => {
    contenedor.innerHTML = ''
}

botonBuscar.addEventListener("click", render)
botonLimpiar.addEventListener("click", limpiarContenedor)