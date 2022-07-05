import state, {
  toggleCart,
  addToCart,
  updateCart,
} from './state';
import render from './render';

const appEl = document.querySelector('#app');
addEventListeners();
render(appEl, state);

///////

function addEventListeners() {
  appEl.addEventListener('click', (e) => {
    if(e.target.classList.contains('toggle-cart')) {
      toggleCart();
      render(appEl, state);
      return;
    }

    if(e.target.classList.contains('add-to-cart')) {
      const productIndex = e.target.dataset.productIndex;
      addToCart({ productIndex, quantity: 1 });
      render(appEl, state);
      return;
    }

    if(e.target.classList.contains('plus-one')) {
      const productIndex = e.target.dataset.productIndex;
      addToCart({ productIndex, quantity: 1 });
      render(appEl, state);
      return;
    }

    if(e.target.classList.contains('minus-one')) {
      const productIndex = e.target.dataset.productIndex;
      addToCart({ productIndex, quantity: -1 });
      render(appEl, state);
      return;
    }
  });
  appEl.addEventListener('change', (e) => {
    if(e.target.classList.contains('quantity')) {
      const productIndex = e.target.dataset.productIndex;
      const quantity = Number(e.target.value);
      if(!isNaN(quantity)) {
        updateCart({ productIndex, quantity });
      }
      render(appEl, state);
      return;
    }
  });


}
