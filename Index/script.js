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

const pedirProductosIndex = async () => {
  const datos = await petición(url, opciones);
  for (producto of datos) {
    construirProductoIndex(producto);
  }
};

const secciónNovedades = document.getElementById("novedades");

const masLeidos = document.getElementById("masLeidos");

const crearProductoIndex = (producto) => {
  let productoLi = document.createElement("li");
  productoLi.classList = "galeria__lista__item";
  productoLi.innerHTML = `<img src="${producto.img}" alt="Portada ${producto.titulo}" class="galeria__lista__item__img">`;
  productoLi.addEventListener("click", () => {
    productoLi.previousSibling.classList.toggle("invisible");
  });
  let modalSec = document.createElement("li");
  modalSec.classList = "invisible salir-de";
  modalSec.innerHTML = `<section id="Recomendacion-Container">
            <div class="recomendacion__background">
                <div class="recomendacion__card">
                    <div class="card__img-recuadro">
                        <img src="${producto.img}" alt="${producto.titulo}" class="card__img">
                    </div>
                    <div class="card__txt">
                        <h4 class="txt__titulo">${producto.titulo}</h4>
                        <div class="card__botones">
                            <div class="precio__background">
                                <span class="precio__txt"><i class="iconos fa-solid fa-dollar fa-sm"></i>${producto.precio}</span>
                            </div>
                            <div class="carrito__background">
                                <i class="iconos fa-solid fa-cart-shopping  fa-2xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="opciones_prime">
                    <a id='botonDesc' class="recomendacion__card recomendacion__card--cambios">
                        <h4 class="txt__h4">Descripción</h4>
                    </a>
                        
                    <a id='botonEspec' class="recomendacion__card recomendacion__card--cambios card--cambios--azul">
                        <h4 class="txt__h4">Especificaciones</h4>
                    </a>
                </div>
                <div class="recomendacion__card recomendacion__card--cambios2">
                    <div class="card__txt">
                        <p class="txt__p">${producto.descripción}</p>
                    </div>
                </div>
                <div class="recomendacion__card recomendacion__card--cambios2 recomendacion__card--cambios2--azul invisible">
          <div class="card__txt">
              <table id="Especificaciones-Tabla">
                  <tr>
                      <th class="Tabla__Titulo Tabla__Item">Tipo</th>
                      <td class="Tabla__Info Tabla__Item">${producto.tipo}</td>
                  </tr>
                  <tr>
                      <th class="Tabla__Titulo Tabla__Item">Dimensiones</th>
                      <td class="Tabla__Info Tabla__Item">${producto.dimensiones}</td>
                  </tr>
                  <tr>
                      <th class="Tabla__Titulo Tabla__Item">Encuadernación</th>
                      <td class="Tabla__Info Tabla__Item">${producto.encuadernación}</td>
                  </tr>
                  <tr>
                      <th class="Tabla__Titulo Tabla__Item">Nº Paginas</th>
                      <td class="Tabla__Info Tabla__Item">${producto.numero_de_paginas}</td>
                  </tr>
                  <tr>
                      <th class="Tabla__Titulo Tabla__Item">Fecha de Edición</th>
                      <td class="Tabla__Info Tabla__Item">${producto.fecha_de_edición}</td>
                  </tr>
                  <tr>
                      <th class="Tabla__Titulo Tabla__Item">Idioma</th>
                      <td class="Tabla__Info Tabla__Item">${producto.idioma}</td>
                  </tr>
                  <tr>
                      <th class="Tabla__Titulo Tabla__Item">Genero</th>
                      <td class="Tabla__Info Tabla__Item">${producto.genero.join("<br>")}</td>
                  </tr>
              </table>
          </div>
      </div>
    </div>
        </section>`;
  return [productoLi, modalSec];
};

const construirProductoIndex = (producto) => {
  if (producto.secciones.includes("Más Leídos", 0)) {
    let elementos = crearProductoIndex(producto);
    let descripciónEspacio = elementos[1].lastElementChild.lastElementChild.lastElementChild
    let especificacionesEspacio = elementos[1].lastElementChild.lastElementChild.lastElementChild.previousElementSibling
    console.log(descripciónEspacio)
    let botonCarrito = elementos[1].lastElementChild.lastElementChild.firstElementChild.lastElementChild.lastElementChild.lastElementChild;
    botonCarrito.addEventListener("click", ()=>{
      console.log("Carrito");
      localCarrito = JSON.parse(localStorage.getItem(`Carrito`));
      let productoInCarrito = false
      for (let productos of localCarrito){
        if (productos.id == producto.id){
          productos.cantidad += 1
          productoInCarrito = true
        }
      };
      if (productoInCarrito){
        console.log("Producto en el Carrito")
      } else {
        producto["cantidad"] = 1
        localCarrito.push(producto)
      }
      localStorage.setItem("Carrito", JSON.stringify(localCarrito))
    })
    butonDesc = elementos[1].lastElementChild.lastElementChild.firstElementChild.nextElementSibling.firstElementChild;
    butonEspc = elementos[1].lastElementChild.lastElementChild.firstElementChild.nextElementSibling.lastElementChild;
    butonDesc.addEventListener("click", ()=>{
      descripciónEspacio.classList.toggle("invisible",true);
      especificacionesEspacio.classList.toggle("invisible",false);
      console.log("Des")
    })
    butonEspc.addEventListener("click", ()=>{
      descripciónEspacio.classList.toggle("invisible",false);
      especificacionesEspacio.classList.toggle("invisible", true);
      console.log("Espc")
    })
    masLeidos.appendChild(elementos[1]);
    masLeidos.appendChild(elementos[0]);
  }
  if (producto.secciones.includes("Novedades", 0)) {
    let elementos = crearProductoIndex(producto);
    let descripciónEspacio = elementos[1].lastElementChild.lastElementChild.lastElementChild
    let especificacionesEspacio = elementos[1].lastElementChild.lastElementChild.lastElementChild.previousElementSibling
    const cambiarEspc = (bool)=>{descripciónEspacio.classList.toggle("invisible", bool)};
    console.log(descripciónEspacio)
    let botonCarrito = elementos[1].lastElementChild.lastElementChild.firstElementChild.lastElementChild.lastElementChild.lastElementChild;
    botonCarrito.addEventListener("click", ()=>{
      console.log("Carrito");
      localCarrito = JSON.parse(localStorage.getItem(`Carrito`));
      let productoInCarrito = false
      for (let productos of localCarrito){
        if (productos.id == producto.id){
          productos.cantidad += 1
          productoInCarrito = true
        }
      };
      if (productoInCarrito){
        console.log("Producto en el Carrito")
      } else {
        producto["cantidad"] = 1
        localCarrito.push(producto)
      }
      localStorage.setItem("Carrito", JSON.stringify(localCarrito))
    })
    butonDesc = elementos[1].lastElementChild.lastElementChild.firstElementChild.nextElementSibling.firstElementChild;
    butonEspc = elementos[1].lastElementChild.lastElementChild.firstElementChild.nextElementSibling.lastElementChild;
    butonDesc.addEventListener("click", ()=>{
      descripciónEspacio.classList.toggle("invisible",true);
      especificacionesEspacio.classList.toggle("invisible",false);
      console.log("Des")
    })
    butonEspc.addEventListener("click", ()=>{
      descripciónEspacio.classList.toggle("invisible",false);
      especificacionesEspacio.classList.toggle("invisible", true);
      console.log("Espc")
    })
    secciónNovedades.appendChild(elementos[1]);
    secciónNovedades.appendChild(elementos[0]);
  }
};

if (localStorage.getItem("Carrito") === null){
  localStorage.setItem("Carrito", JSON.stringify([]))
}

pedirProductosIndex();
