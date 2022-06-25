"use strict";
(function () {
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
  const productsListEl = document.querySelector(".products-list");
  const productItems = products
    .map(
      (product) => `
    <li class="product">
      <div class="product-display">
        <img src="${product.img}" alt="${product.name} class="product-img""/>
      </div>
      <div class="product-details">
        <p class="product-name">Name: ${product.name}</p>
        <label>
        Quantity:
        <input type="number" value="${product.quantity}" class="product-price">
        </label>
        <p class="product-total"><span>Total:</span> ${product.total}</p>
      </div>
      <div 
    </li>
  `
    )
    .join("\n");
  productsListEl.innerHTML = productItems;
})();
