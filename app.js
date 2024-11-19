//Practicing JS

// dropdown menu------------->
let iconMenu = document.querySelector(".icon__menu");
let iconClose = document.querySelector(".icon__close");
let containerMenu = document.querySelector(".container__menu");
let menu = document.querySelector(".menu");

function showMenu() {
  containerMenu.classList.remove("desactive__menu");
  menu.classList.add("transition__menu");
}
function hideMenu() {
  containerMenu.classList.add("desactive__menu");
}

iconMenu.addEventListener("click", showMenu);
iconClose.addEventListener("click", hideMenu);

containerMenu.addEventListener("click", (e) => {
  if (!menu.contains(e.target)) {
    hideMenu();
  }
});

// show products from shopping cart--------------->
let iconCart = document.querySelector(".container__icon__cart");
let containerCart = document.querySelector(".container__products");
let cartProducts = document.querySelector(".cart__products");

function showCartProducts() {
  containerCart.classList.toggle("hide__card-product");
}

iconCart.addEventListener("click", showCartProducts);

// change product-------->
let imageMain = document.querySelector(".image__product");
let imageMain2 = document.querySelector(".image__product2");

let containerImgProduct = document.querySelector(".img__products");
let containerImgProduct2 = document.querySelector(".img__products2");

let imageProduct = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg",
];
function innerImage(product_, indexs, items) {
  return `<div class="style__selectImg container__img-select containerImg--${items}${indexs}"><img src="${product_}" alt="Productcart" class="img__addProduct-${items} img__addProduct-${items}${indexs}" data-id="${indexs}"></div>`;
}

let imgproducts = imageProduct.map((product, index) => {
  return innerImage(product, index + 1, "0");
});

let imgproducts2 = imageProduct.map((product, index) => {
  return innerImage(product, index + 1, "1");
});

let imgSelect = document.querySelector(".container__img-select");

containerImgProduct.innerHTML = imgproducts.join(" ");
containerImgProduct2.innerHTML = imgproducts2.join(" ");

let positions = 0;
let n = 1;

imageMain.src = imageProduct[positions];
imageMain2.src = imageProduct[positions];

let num = [0, 1];

function styleBorderImg(selectedId) {
  // Eliminar la clase de estilo de todas las miniaturas
  document
    .querySelectorAll(".container__img-select")
    .forEach((imgContainer) => {
      imgContainer.classList.remove("style__img-select");
    });

  num.forEach((item) => {
    document.querySelectorAll(`.img__addProduct-${item}`).forEach((img) => {
      img.classList.remove("imgOpacityActive");
    });

    document
      .querySelector(`.containerImg--${item}${selectedId}`)
      .classList.add("style__img-select");

    document
      .querySelector(`.img__addProduct-${item}${selectedId}`)
      .classList.add("imgOpacityActive");
  });
}

styleBorderImg(1);

function handleImageClick(e) {
  let $attribu = e.target.getAttribute("data-id");
  if ($attribu) {
    const positionIndex = parseInt($attribu) - 1;
    positions = positionIndex;
    n = parseInt($attribu);
    // Actualizar la imagen principal
    imageMain.src = `./images/image-product-${$attribu}.jpg`;
    imageMain2.src = `./images/image-product-${$attribu}.jpg`;

    // Aplicar estilos a la imagen seleccionada
    styleBorderImg($attribu);
  }
}
[containerImgProduct, containerImgProduct2].forEach((container) => {
  container.addEventListener("click", handleImageClick);
});
function clickBtnChange(next, pre) {
  next.addEventListener("click", () => {
    positions++;

    if (positions > imageProduct.length - 1) {
      positions = 0;
    }
    n = positions + 1;
    updateImageAndStyle();
  });

  pre.addEventListener("click", () => {
    positions--;

    if (positions < 0) {
      positions = imageProduct.length - 1;
    }
    n = positions + 1;
    updateImageAndStyle();
  });
}
function updateImageAndStyle() {
  imageMain.src = imageProduct[positions];
  imageMain2.src = imageProduct[positions];
  styleBorderImg(n);
}
const mediaQuery = window.matchMedia("(min-width: 1024px)");

function changeImage(e) {
  if (e.matches) {
    let iconPrevious = document.querySelector(".container__previous2");
    let iconNext = document.querySelector(".container__next2");
    clickBtnChange(iconNext, iconPrevious);
  } else {
    let iconPrevious = document.querySelector(".container__previous");
    let iconNext = document.querySelector(".container__next");
    clickBtnChange(iconNext, iconPrevious);
  }
}
mediaQuery.addEventListener("change", changeImage);
changeImage(mediaQuery);

//COUNTER PRODUCTS
let counter = document.querySelector(".price-section");
let quantity = document.querySelector(".quantity");
let $numProducts = document.querySelector(".num__product");

let numQuantity = 1;
quantity.textContent = numQuantity;

counter.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-plus")) {
    numQuantity++;
    quantity.textContent = numQuantity;
  } else if (e.target.classList.contains("icon-minus")) {
    if (numQuantity >= 2) {
      numQuantity--;
      quantity.textContent = numQuantity;
    }
  }
});

//ADD PRODUCT CART--------------------------------->
let containerListPrdoduct = document.querySelector(".container__listProduct");
let btnCheckout = document.querySelector(".btn__checkout");

let productsAdds = [];

function addProductCart() {
  productsAdds.push({
    unitPrice: 125.0,
    quantity: numQuantity,
  });
}
function list() {
  if (productsAdds.length === 0) {
    containerListPrdoduct.innerHTML = `<p class="cart___empty">Your cart is empty.</p>`;
    btnCheckout.classList.add("btn-hide");
    $numProducts.classList.add("btn-hide");
  } else {
    let listPrododucts = productsAdds.map((product, index) => {
      return `<article class="product__add">
      <img src="./images/image-product-1-thumbnail.jpg" alt="Productcart" class="img__add--product">
      <div class="price__product--add">
        <p>Fall Limited Edition Sneakers</p>
        <div>
          <span>$125.00 x ${product.quantity}</span>
          <span class="price__total">$${
            product.unitPrice * product.quantity
          }.00</span>
        </div>
      </div>
      <img src="./images/icon-delete.svg" title="Delete" alt="icon delete" class="icon__delete" data-index="${index}">
    </article>`;
    });
    btnCheckout.classList.remove("btn-hide");
    $numProducts.classList.remove("btn-hide");

    containerListPrdoduct.innerHTML = listPrododucts.join(" ");
  }
}
list();
let btnAdd = document.querySelector(".add-to-cart");
btnAdd.addEventListener("click", () => {
  addProductCart();
  list();
  $numProducts.textContent = productsAdds.length;
});

//DELETE PRODUCT THEL CART------------------------------------>
containerListPrdoduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon__delete")) {
    let index = e.target.getAttribute("data-index");
    productsAdds.splice(index, 1);
  }
  $numProducts.textContent = productsAdds.length;
  list();
});

let boxImage = document.querySelector(".container__box--image");
let iconClose2 = document.querySelector(".iconClose2");

function showProduct() {
  boxImage.classList.remove("box-desactive");
}
function hideProduct() {
  boxImage.classList.add("box-desactive");
}

imageMain.addEventListener("click", showProduct);
iconClose2.addEventListener("click", hideProduct);

boxImage.addEventListener("click", (e) => {
  if (e.target.classList.contains("container__box--image")) {
    hideProduct();
  }
});
//------------------------------------>
