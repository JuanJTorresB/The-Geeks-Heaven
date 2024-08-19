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

const url = "/Datos/Productos.json";

const pedirProductosCatalogo = async () => {
  const datos = await petición(url, opciones);
  todosContainer.innerHTML = ""
  for (producto of datos) {
    construirProductoCatalogo(producto);
  }
};

const crearProductoCatalogo = (producto) => {
  let productoLi = document.createElement("li");
  productoLi.classList = "galeria__lista__item";
  productoLi.innerHTML = `<img src="${producto.img}" alt="Portada ${producto.titulo}" class="lista__item__img">`;
  productoLi.addEventListener("click", () => {
    productoLi.previousSibling.classList.toggle("invisible");
  });
  let modalSec = document.createElement("li");
  modalSec.classList = "invisible salir-de";
  modalSec.innerHTML = `<section id="Recomendacion-Container">
              <div class="recomendacion__background">
                  <div class="recomendacion__card">
                      <div class="card__img-recuadro">
                          <img src="${producto.img}" alt="${
    producto.titulo
  }" class="card__img">
                      </div>
                      <div class="card__txt">
                          <h4 class="txt__titulo">${producto.titulo}</h4>
                          <div class="card__botones">
                              <div class="precio__background">
                                  <span class="precio__txt"><i class="iconos fa-solid fa-dollar"></i>${
                                    producto.precio
                                  }</span>
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
                        <td class="Tabla__Info Tabla__Item">${
                          producto.tipo
                        }</td>
                    </tr>
                    <tr>
                        <th class="Tabla__Titulo Tabla__Item">Dimensiones</th>
                        <td class="Tabla__Info Tabla__Item">${
                          producto.dimensiones
                        }</td>
                    </tr>
                    <tr>
                        <th class="Tabla__Titulo Tabla__Item">Encuadernación</th>
                        <td class="Tabla__Info Tabla__Item">${
                          producto.encuadernación
                        }</td>
                    </tr>
                    <tr>
                        <th class="Tabla__Titulo Tabla__Item">Nº Paginas</th>
                        <td class="Tabla__Info Tabla__Item">${
                          producto.numero_de_paginas
                        }</td>
                    </tr>
                    <tr>
                        <th class="Tabla__Titulo Tabla__Item">Fecha de Edición</th>
                        <td class="Tabla__Info Tabla__Item">${
                          producto.fecha_de_edición
                        }</td>
                    </tr>
                    <tr>
                        <th class="Tabla__Titulo Tabla__Item">Idioma</th>
                        <td class="Tabla__Info Tabla__Item">${
                          producto.idioma
                        }</td>
                    </tr>
                    <tr>
                        <th class="Tabla__Titulo Tabla__Item">Genero</th>
                        <td class="Tabla__Info Tabla__Item">${producto.genero.join(
                          "<br>"
                        )}</td>
                    </tr>
                </table>
            </div>
        </div>
      </div>
          </section>`;
  return [productoLi, modalSec];
};

const construirProductoCatalogo = (producto) => {
    if (!filtroCatalogo(producto)){
        return
    }
    let elementos = crearProductoCatalogo(producto);
    let descripciónEspacio =
      elementos[1].lastElementChild.lastElementChild.lastElementChild;
    let especificacionesEspacio =
      elementos[1].lastElementChild.lastElementChild.lastElementChild
        .previousElementSibling;
    console.log(descripciónEspacio);
    let botonCarrito =
      elementos[1].lastElementChild.lastElementChild.firstElementChild
        .lastElementChild.lastElementChild.lastElementChild;
    botonCarrito.addEventListener("click", () => {
      console.log("Carrito");
      localCarrito = JSON.parse(localStorage.getItem(`Carrito`));
      let productoInCarrito = false;
      for (let productos of localCarrito) {
        if (productos.id == producto.id) {
          productos.cantidad += 1;
          productoInCarrito = true;
        }
      }
      if (productoInCarrito) {
        console.log("Producto en el Carrito");
      } else {
        producto["cantidad"] = 1;
        localCarrito.push(producto);
      }
      localStorage.setItem("Carrito", JSON.stringify(localCarrito));
    });
    butonDesc =
      elementos[1].lastElementChild.lastElementChild.firstElementChild
        .nextElementSibling.firstElementChild;
    butonEspc =
      elementos[1].lastElementChild.lastElementChild.firstElementChild
        .nextElementSibling.lastElementChild;
    butonDesc.addEventListener("click", () => {
      descripciónEspacio.classList.toggle("invisible", true);
      especificacionesEspacio.classList.toggle("invisible", false);
      console.log("Des");
    });
    butonEspc.addEventListener("click", () => {
      descripciónEspacio.classList.toggle("invisible", false);
      especificacionesEspacio.classList.toggle("invisible", true);
      console.log("Espc");
    });
    todosContainer.appendChild(elementos[1])
    todosContainer.appendChild(elementos[0])
};

const todosContainer = document.getElementById("Todos-Container__lista")

var Genero = "Manga"

const filtroCatalogo = (producto)=>{
    if (producto.genero.includes(Genero)){
        return true
    } else {
        return false
    }
}

const filtroManga = document.getElementById("Manga")
const filtroNovelaRomántica = document.getElementById("Novela_Romántica_Juvenil")
const filtroAcción = document.getElementById("Acción")
const filtroFantasíaOscura = document.getElementById("Fantasía_Oscura")
const filtroAventura = document.getElementById("Aventura")
const filtroDrama = document.getElementById("Drama")
const filtroSuperhéroes = document.getElementById("Superhéroes")

filtroManga.addEventListener("change", ()=>{
    Genero = "Manga";
    pedirProductosCatalogo()
});
filtroNovelaRomántica.addEventListener("change", ()=>{
    Genero = "Novela Romántica Juvenil";
    pedirProductosCatalogo()
});
filtroAcción.addEventListener("change", ()=>{
    Genero = "Acción";
    pedirProductosCatalogo()
});
filtroFantasíaOscura.addEventListener("change", ()=>{
    Genero = "Fantasía Oscura";
    pedirProductosCatalogo()
});
filtroAventura.addEventListener("change", ()=>{
    Genero = "Aventura";
    pedirProductosCatalogo()
});
filtroDrama.addEventListener("change", ()=>{
    Genero = "Drama";
    pedirProductosCatalogo()
});
filtroSuperhéroes.addEventListener("change", ()=>{
    Genero = "Superhéroes";
    pedirProductosCatalogo()
});

pedirProductosCatalogo()