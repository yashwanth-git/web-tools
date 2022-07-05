const state = {
  showCart: false,
  products: [
    {
      name: 'Savage Fluffball',
      thumbnail: 'http://placekitten.com/50/50?image=1',
      image: 'http://placekitten.com/150/150?image=1',
      price: 0.99,
    },
    {
      name: 'General Mewmew',
      thumbnail: 'http://placekitten.com/50/50?image=2',
      image: 'http://placekitten.com/150/150?image=2',
      price: 3.14,
    },
    {
      name: 'Cat5',
      thumbnail: 'http://placekitten.com/50/50?image=3',
      image: 'http://placekitten.com/150/150?image=3',
      price: 2.73,
    },
  ],
  cart: [],
};

export function toggleCart() {
  state.showCart = !state.showCart;
}

export function addToCart({ productIndex, quantity }) {

  const cartIndex = state.cart.findIndex( (element) => element.productIndex === productIndex );

  if( cartIndex > -1 ) {
    state.cart[cartIndex].quantity += quantity;
    if(!state.cart[cartIndex].quantity) {
      state.cart.splice(cartIndex, 1);
    }
    return;
  }

  state.cart.push({ productIndex, quantity });
}

export function updateCart({ productIndex, quantity }) {
  const cartIndex = state.cart.findIndex( (element) => element.productIndex === productIndex );

  if( cartIndex > -1 ) {
    state.cart[cartIndex].quantity = quantity;
    if(!state.cart[cartIndex].quantity) {
      state.cart.splice(cartIndex, 1);
    }
    return;
  }
  state.cart.push({ productIndex, quantity });
}

export default state;
