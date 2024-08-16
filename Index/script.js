//Headers

const cabeceras = new Headers();
cabeceras.set("Content-Type", "application/json");

const opciones = {
  method: "GET",
  Headers: cabeceras,
};

const petición = async (url, opciones) => {
  const respuesta = await fetch(url, opciones);
  if (respuesta.ok) {
    const datos = await respuesta.json();
    return datos;
  } else {
    return [];
  }
};

const url = "Datos/Productos.json";

const pedirProductosIndex = async()=>{
    const datos = await petición(url, opciones)
    for (producto of datos){

    }
}
arr = [].includes()

const construirProductoIndex = (producto)=>{
    const productoLi = document.createElement("li")
    productoLi.classList = "galeria__lista__item"
    productoLi.innerHTML = `<img src="${producto.img}" alt="Portada ${producto.titulo}" class="galeria__lista__item__img">`
    if ((producto.secciones).includes("Mas Leidos")){
        masLeidos.appendChild(productoLi)
    }
    if ((producto.secciones).includes("Novedades")){
        secciónNovedades.appendChild(productoLi)
    }
}

const secciónNovedades = document.getElementById("novedades")

const masLeidos = document.getElementById("masLeidos")

pedirProductosIndex()