"use strict";
import { products } from "./state";
(function () {
  let showCart = false;
  const cart = [];

  const productListContainerEl = document.querySelector(
    ".product-list-container"
  );

  render();
  addEventListeners();

  function render() {
    productListContainerEl.innerHTML =
      `
    <div class="view-cart">
      <button class="view-cart-btn">${
        showCart ? "Hide Cart" : "Show Cart"
      }<span>${cart.length}</span></button>
    </div>
    <ul class="products-list">
    ` +
      products
        .map(
          (product, index) => `
      <li class="product">
        <div class="product-display">
          <img src="${product.img}" alt="${product.name} class="product-img"/>
        </div>
        <div class="product-details">
          <p class="product-name">Name: ${product.name}</p>
          <div class="prod-quantity">
            <p>Quantity: <span> ${product.quantity}</span></p>
          </div>
          <p class="product-total"><span>Total:</span> ${product.total}</p>
          <button class="add-to-cart" data-index='${index}'>Add to Cart</button>
        </div>
        <div 
      </li>
    `
        )
        .join("\n") +
      `</ul>
    <div class="cart-products ${showCart ? "show" : "hide"}">
      <h1>Cart Details</h1>
      ${
        !cart.length
          ? `<div class="empty-cart"><p>Nothing in the cart<p></div>`
          : `
      <div class="cart-products-list">
        <ul class="product-list">
          ` +
            cart
              .map(
                (prod, index) => `
          <li class="product">
          <div class="product-display">
            <img src="${products[prod.prodIndex].img}" alt="${
                  products[prod.prodIndex].name
                } class="product-img""/>
          </div>
          <div class="product-details">
            <p class="product-name">Name: ${products[prod.prodIndex].name}</p>
            <label>
              Quantity:
                <input type="number" value="${
                  prod.quantity
                }" class="product-quantity" data-index='${index}' min="1">
          </label>
            <p class="product-total"><span>Total:</span> ${Number.parseFloat(
              prod.quantity * products[prod.prodIndex].price
            ).toFixed(2)}</p>
          </div>
          <div 
        </li>
          `
              )
              .join("\n") +
            `
        </ul>
        <div class="total-price">
          <p>Total: <span>${
            cart.length > 0
              ? Number.parseFloat(
                  cart.reduce((sum, c) => sum + Number(c.total), 0)
                ).toFixed(2)
              : ""
          }</span><p>
        </div>
        <div class="checkout">
          <button class="checkout-btn">Checkout</button>
        </div>
      </div>
      
    </div>
      `
      }
    `;
  }

  function addEventListeners() {
    productListContainerEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("view-cart-btn")) {
        showCart = !showCart;
        render();
      }
      if (e.target.classList.contains("add-to-cart")) {
        const index = e.target.dataset.index;
        if (!cart[index]) {
          cart[index] = {
            prodIndex: index,
            quantity: products[index].quantity,
            total: products[index].total,
          };
          render();
        } else {
          cart[index].quantity += 1;
          cart[index].total = Number.parseFloat(
            cart[index].quantity * products[cart[index].prodIndex].price
          ).toFixed(2);
          render();
        }
      }
      if (e.target.classList.contains("checkout-btn")) {
        cart.length = 0;
        showCart = !showCart;
        render();
      }
    });
    productListContainerEl.addEventListener("change", (e) => {
      if (e.target.classList.contains("product-quantity")) {
        const index = e.target.dataset.index;
        cart[index].quantity = Number(e.target.value);
        cart[index].total = Number.parseFloat(
          cart[index].quantity * products[cart[index].prodIndex].price
        ).toFixed(2);
        render();
      }
    });
  }
})();
