function render(appEl, state) {

  const cartHtml = generateCart(state);
  const productHtml = generateProductPage(state);

  const html = `
    ${productHtml}
    ${cartHtml}
  `;

  appEl.innerHTML = html;

}

function generateProductPage(state) {
  const cartButtonText = generateCartButtonText(state);
  const productList = generateProductList(state);
  const productHtml = `
    <button
      class="toggle-cart"
      type="button"
    >${cartButtonText}</button>
    <ul class="products">
      ${productList}
    </ul>
   `;
  return productHtml;
}

function generateCartButtonText(state) {
  // let cartCount = 0;
  // for( let item of state.cart ) {
  //   cartCount += item.quantity;
  // }

  const cartCount = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const countText = cartCount ? ` (${cartCount})` : '';

  const cartButtonText = state.showCart ? 'Close Cart' : `View Cart${countText}`;
  return cartButtonText;
}

function generateProductList(state) {
  const listHtml = state.products.map( (item, index) => {
    return `
    <li class="product-item">
      <span>${item.name}</span>
      <img src="${item.image}" alt="product pic for ${item.name}">
      <span>${item.price.toFixed(2)}</span>
      <button
        type="button"
        class="add-to-cart"
        data-product-index="${index}"
       >Add To Cart</button>
    </li>
    `;
  }).join('\n');
  return listHtml;
}

function generateCart(state) {
  if(!state.showCart) {
    return '';
  }

  const cartList = state.cart.map( (item) => {
    const product = state.products[item.productIndex];
    return `
      <li>
        <span>${product.name}</span>
        <img src="${product.thumbnail}" alt="thumbnail of ${product.name}">
        <span>
          <button
            type="button"
            class="minus-one"
            data-product-index="${item.productIndex}"
            >-</button>
          <input class="quantity" value="${item.quantity}" data-product-index="${item.productIndex}">
          <button
            type="button"
            class="plus-one"
            data-product-index="${item.productIndex}"
            >+</button>
          </span>
        <span>$${product.price}</span>
        <span>$${ (item.quantity * product.price).toFixed(2) }</span>
      </li>
    `;
  }).join('\n');

  if(!cartList) {
    return '<div class="empty-cart">Nothing in the cart</div>';
  }

  let total = 0;
  for( let item of state.cart) {
    const product = state.products[item.productIndex];
    total += item.quantity * product.price;
  }

  const cartHtml = `
    <ul class="cart">
      ${cartList}
    </ul>
    Total Price: $${total.toFixed(2)}
  `;

  return cartHtml;
}

export default render;
