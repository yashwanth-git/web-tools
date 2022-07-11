/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "products": () => (/* binding */ products)
/* harmony export */ });
var products = [{
  name: "Jorts",
  img: "http://placekitten.com/150/150?image=1",
  quantity: 1,
  price: 0.99,
  total: 0.99
}, {
  name: "Fluffball",
  img: "http://placekitten.com/150/150?image=2",
  quantity: 1,
  price: 3.14,
  total: 3.14
}, {
  name: "General Meyhem",
  img: "http://placekitten.com/150/150?image=3",
  quantity: 1,
  price: 2.73,
  total: 2.73
}];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");




(function () {
  var showCart = false;
  var cart = [];
  var productListContainerEl = document.querySelector(".product-list-container");
  render();
  addEventListeners();

  function render() {
    productListContainerEl.innerHTML = "\n    <div class=\"view-cart\">\n      <button class=\"view-cart-btn\">".concat(showCart ? "Hide Cart" : "View Cart", "<span>").concat(cart.length, "</span></button>\n    </div>\n    <ul class=\"products-list\">\n    ") + _state__WEBPACK_IMPORTED_MODULE_0__.products.map(function (product, index) {
      return "\n      <li class=\"product\">\n        <div class=\"product-display\">\n          <img src=\"".concat(product.img, "\" alt=\"").concat(product.name, " class=\"product-img\"/>\n        </div>\n        <div class=\"product-details\">\n          <p class=\"product-name\">Name: ").concat(product.name, "</p>\n          <div class=\"prod-quantity\">\n            <p>Quantity: <span> ").concat(product.quantity, "</span></p>\n          </div>\n          <p class=\"product-total\"><span>Total:</span> ").concat(product.total, "</p>\n          <button class=\"add-to-cart\" data-index='").concat(index, "'>Add to Cart</button>\n        </div>\n        <div \n      </li>\n    ");
    }).join("\n") + "</ul>\n    <div class=\"cart-products ".concat(showCart ? "show" : "hide", "\">\n      <h1>Cart Details</h1>\n      ").concat(!cart.length ? "<div class=\"empty-cart\"><p>Nothing in the cart<p></div>" : "\n      <div class=\"cart-products-list\">\n        <ul class=\"product-list\">\n          " + cart.map(function (prod, index) {
      return "\n          <li class=\"product\">\n          <div class=\"product-display\">\n            <img src=\"".concat(_state__WEBPACK_IMPORTED_MODULE_0__.products[prod.prodIndex].img, "\" alt=\"").concat(_state__WEBPACK_IMPORTED_MODULE_0__.products[prod.prodIndex].name, " class=\"product-img\"\"/>\n          </div>\n          <div class=\"product-details\">\n            <p class=\"product-name\">Name: ").concat(_state__WEBPACK_IMPORTED_MODULE_0__.products[prod.prodIndex].name, "</p>\n            <label>\n              Quantity:\n                <input type=\"number\" value=\"").concat(prod.quantity, "\" class=\"product-quantity\" data-index='").concat(index, "' min=\"1\">\n          </label>\n            <p class=\"product-total\"><span>Total:</span> ").concat(Number.parseFloat(prod.quantity * _state__WEBPACK_IMPORTED_MODULE_0__.products[prod.prodIndex].price).toFixed(2), "</p>\n          </div>\n          <div \n        </li>\n          ");
    }).join("\n") + "\n        </ul>\n        <div class=\"total-price\">\n          <p>Total: <span>".concat(cart.length > 0 ? Number.parseFloat(cart.reduce(function (sum, c) {
      return sum + Number(c.total);
    }, 0)).toFixed(2) : "", "</span><p>\n        </div>\n        <div class=\"checkout\">\n          <button class=\"checkout-btn\">Checkout</button>\n        </div>\n      </div>\n      \n    </div>\n      "), "\n    ");
  }

  function addEventListeners() {
    productListContainerEl.addEventListener("click", function (e) {
      if (e.target.classList.contains("view-cart-btn")) {
        showCart = !showCart;
        render();
      }

      if (e.target.classList.contains("add-to-cart")) {
        var index = e.target.dataset.index;

        if (!cart[index]) {
          cart[index] = {
            prodIndex: index,
            quantity: _state__WEBPACK_IMPORTED_MODULE_0__.products[index].quantity,
            total: _state__WEBPACK_IMPORTED_MODULE_0__.products[index].total
          };
          render();
        } else {
          cart[index].quantity += 1;
          cart[index].total = Number.parseFloat(cart[index].quantity * _state__WEBPACK_IMPORTED_MODULE_0__.products[cart[index].prodIndex].price).toFixed(2);
          render();
        }
      }

      if (e.target.classList.contains("checkout-btn")) {
        cart.length = 0;
        showCart = !showCart;
        render();
      }
    });
    productListContainerEl.addEventListener("change", function (e) {
      if (e.target.classList.contains("product-quantity")) {
        var index = e.target.dataset.index;
        cart[index].quantity = Number(e.target.value);
        cart[index].total = Number.parseFloat(cart[index].quantity * _state__WEBPACK_IMPORTED_MODULE_0__.products[cart[index].prodIndex].price).toFixed(2);
        render();
      }
    });
  }
})();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map