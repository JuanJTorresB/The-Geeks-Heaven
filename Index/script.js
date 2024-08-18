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

const pedirProductosIndex = async () => {
  const datos = await petición(url, opciones);
  for (producto of datos) {
    construirProductoIndex(producto);
  }
};

arr = [].includes("", 0);

const secciónNovedades = document.getElementById("novedades");

const masLeidos = document.getElementById("masLeidos");

const crearProductoIndex = (producto)=>{
  let productoLi = document.createElement("li");
  productoLi.classList = "galeria__lista__item";
  productoLi.innerHTML = `<img src="${producto.img}" alt="Portada ${producto.titulo}" class="galeria__lista__item__img">`;
  productoLi.addEventListener("click", () => {
    productoLi.previousSibling.classList.toggle("invisible", false);
  });
  let modalSec = document.createElement("li");
  modalSec.classList = "invisible";
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
                                          <span class="precio__txt"><i class="iconos fa-solid fa-dollar"></i>${producto.precio}</span>
                                      </div>
                                      <div class="carrito__background">
                                          <i class="iconos fa-solid fa-heart fa-2xl"></i>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="opciones_prime">
                              <a href="" class="recomendacion__card recomendacion__card--cambios">
                                  <h4 class="txt__h4">Descripción</h4>
                              </a>
                                  
                              <a href="../../especificaciones/Berserk/berserk.html" class="recomendacion__card recomendacion__card--cambios card--cambios--azul">
                                  <h4 class="txt__h4">Especificaciones</h4>
                              </a>
                          </div>
                          <div class="recomendacion__card recomendacion__card--cambios2">
                              <div class="card__txt">
                                  <p class="txt__p">${producto.descripción}</p>
                              </div>
                          </div>
                      </div>
  </li>`;
  return [productoLi, modalSec]
}

const construirProductoIndex = (producto) => {
  if (producto.secciones.includes("Más Leídos", 0)) {
    let elementos = crearProductoIndex(producto)
    masLeidos.appendChild(elementos[1]);
    masLeidos.appendChild(elementos[0]);
  }
  if (producto.secciones.includes("Novedades", 0)) {
    let elementos = crearProductoIndex(producto)
    secciónNovedades.appendChild(elementos[1]);
    secciónNovedades.appendChild(elementos[0]);
  }
};

pedirProductosIndex();
