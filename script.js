const estado = {
    raza: "",
    fotos: []
}

const contenedor = document.getElementById('contenedor-resultados')
const botonBuscar = document.getElementById("botonBuscar")
const inputRaza = document.getElementById("inputRaza")

const render = () => {
  buscarPerritos(inputRaza.value)
    .then(() => {
      estado.fotos.forEach(urlFoto => {
        const img = document.createElement('img')
        img.src = urlFoto
        img.className = 'fotoPerro'
        contenedor.appendChild(img)
      });
    }).catch(error => {
        console.error("Ocurrió un error al mostrar las fotos", error)
        const err = document.createElement('p')
        err.className = 'mensajeError'
        err.textContent = "Ocurrió un error al mostrar las fotos"
        contenedor.appendChild(err)
      });
}

function buscarPerritos(raza) {
  limpiarContenedor()
  estado.fotos.splice(0)
  const url = `https://dog.ceo/api/breed/${raza.toLowerCase().trim()}/images/random/8`
  const promesaBusqueda = new Promise((resolve, reject) => {
    fetch(url) //fetch es asincronica y hace una peticion HTTP (en este caso GET). Devuelve una promesa que al resolverse, devuelve un objeto response (web)
      .then(respuesta => respuesta.ok ? respuesta.json() : reject("Error en respuesta")) // "respuesta" recibe el objeto RESPONSE.
      .then(datos => {
        estado.fotos.push(...datos.message)
        resolve() //todo joya - se manda OK
      })
      .catch(error => {reject(error)}) //murió - se manda ERROR
  });
  return promesaBusqueda;
};
/*
const render = async () => {
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
    const datos = await respuesta.json() // no se va a ejecutar esta linea hasta que haya terminado la anterior
    
    const urlFoto = datos.message
    estado.fotos.push(...urlFoto)
    
  } catch (error) {
    console.error("No se han podido obtener fotos")
    const err = document.createElement('p')
    err.className = 'mensajeError'
    err.textContent = 'No se han podido obtener fotos'
    contenedor.appendChild(err)
  }
}
*/

const limpiarContenedor = () => {
    contenedor.innerHTML = ''
}

botonBuscar.addEventListener("click", render)
botonLimpiar.addEventListener("click", limpiarContenedor)