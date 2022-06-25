"use strict";
(function () {
  let viewCart = false;
  const products = [
    {
      name: "Jorts",
      img: "http://placekitten.com/150/150?image=1",
      quantity: 1,
      price: 0.99,
      total: 0.99,
      isAddedtoCart: false,
    },
    {
      name: "Fluffball",
      img: "http://placekitten.com/150/150?image=2",
      quantity: 1,
      price: 3.14,
      total: 3.14,
      isAddedtoCart: false,
    },
    {
      name: "General Meyhem",
      img: "http://placekitten.com/150/150?image=3",
      quantity: 1,
      price: 2.73,
      total: 2.73,
      isAddedtoCart: false,
    },
  ];
  const cartProducts = [
  ];

  const productListContainerEl = document.querySelector(
    ".product-list-container"
  );

  const viewCartBtn = document.querySelector(".view-cart-btn");

  render();
  addEventListeners();

  function render() {
    productListContainerEl.innerHTML =
      `
    <div class="view-cart">
      <button class="view-cart-btn">View Cart <span>${cartProducts.length}</span></button>
    </div>
    <ul class="products-list">
    ` +
      products
        .map(
          (product, index) => `
      <li class="product">
        <div class="product-display">
          <img src="${product.img}" alt="${product.name} class="product-img""/>
        </div>
        <div class="product-details">
          <p class="product-name">Name: ${product.name}</p>
          <label>
          Quantity:
          <input type="number" value="${
            product.quantity
          }" class="product-price" min="1">
          </label>
          <p class="product-total"><span>Total:</span> ${product.total}</p>
          <button class="add-to-cart" data-index='${index}'>${
            product.isAddedtoCart ? "Added to Cart" : "Add to Cart"
          }</button>
        </div>
        <div 
      </li>
    `
        )
        .join("\n") +
      `</ul>`;
  }

  function addEventListeners() {
    productListContainerEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("view-cart-btn")) {
        viewCart = !viewCart;
      }
      if(e.target.classList.contains("add-to-cart")){
        const index = e.target.dataset.index;
        products[index].isAddedtoCart = true;
        cartProducts.push(products[index]);
        render();
      }
    });
  }
})();
