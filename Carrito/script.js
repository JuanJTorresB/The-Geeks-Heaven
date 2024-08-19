const crearElementoCarrito = (producto) => {
  let elementoFigure = document.createElement("figure");
  elementoFigure.classList = "Recomendacion-Container";
  elementoFigure.innerHTML = `<div class="recomendacion__background">
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
                                  producto.precio * producto.cantidad
                                }</span>
                            </div>
                            <button class="carrito__background">
                                <i class="iconos inconos__nav fa-solid fa-trash fa-sm"></i>
                            </button>
                            <div class="carrito__background">
                                <button class="cantidad cantidad__boton">+</button>
                                <output class="cantidad">${
                                  producto.cantidad
                                }</output>
                                <button class="cantidad cantidad__boton">-</button>
                            </div>
                        </div>
                    </div>
                </div>
    </div>`;
  let botonMás =
    elementoFigure.lastElementChild.lastElementChild.lastElementChild
      .lastElementChild.lastElementChild.firstElementChild;
  let botoMenos =
    elementoFigure.lastElementChild.lastElementChild.lastElementChild
      .lastElementChild.lastElementChild.lastElementChild;
  let botonBorrar =
    elementoFigure.lastElementChild.lastElementChild.lastElementChild
      .lastElementChild.lastElementChild.previousElementSibling;
  botonBorrar.addEventListener("click", () => {
    let productosCarritoLocal = JSON.parse(localStorage.getItem("Carrito"));
    for (let productos of productosCarritoLocal) {
      if (productos.id == producto.id) {
        productosCarritoLocal.splice(
          productosCarritoLocal.indexOf(productos),
          1
        );
      }
    }
    localStorage.setItem("Carrito", JSON.stringify(productosCarritoLocal));
    dibujarCarrito();
  });
  botonMás.addEventListener("click", () => {
    let productosCarritoLocal = JSON.parse(localStorage.getItem("Carrito"));
    for (let productos of productosCarritoLocal) {
      if (productos.id == producto.id) {
        productos.cantidad += 1;
      }
    }
    localStorage.setItem("Carrito", JSON.stringify(productosCarritoLocal));
    dibujarCarrito();
  });
  botoMenos.addEventListener("click", () => {
    let productosCarritoLocal = JSON.parse(localStorage.getItem("Carrito"));
    for (let productos of productosCarritoLocal) {
      if (productos.id == producto.id && productos.cantidad > 1) {
        productos.cantidad -= 1;
      }
    }
    localStorage.setItem("Carrito", JSON.stringify(productosCarritoLocal));
    dibujarCarrito();
  });
  return elementoFigure;
};

const carrito__espacio__elementos = document.getElementById(
  "carrito__espacio__elementos"
);

arr = [].splice();
arrd = [].index;

const dibujarCarrito = () => {
  carrito__espacio__elementos.innerHTML = "";
  let productosCarritoLocal = JSON.parse(localStorage.getItem("Carrito"));
  for (let productos of productosCarritoLocal) {
    carrito__espacio__elementos.appendChild(crearElementoCarrito(productos));
  }
};

dibujarCarrito();
