import {products,getProduct} from '../../data/products.js';
import {cart, cartCounter, DeleteFromCart,updateDelivryOption} from '../../data/cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {delivryOptions,getDelivryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
  let productGridHTML= '';

  cart.forEach((cartItem) => {
    let productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    const delivryOptionId = cartItem.delivryOptionId;

    const delivryOption = getDelivryOption(delivryOptionId);

    const today = dayjs();
      const delivryDate = today.add(
        delivryOption.delivryDays,
        'days'
      );
      const dateStr = delivryDate.format(
        'dddd, MMMM D'
      );

    productGridHTML +=`<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                  Delivery date: ${dateStr}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${(matchingProduct.priceCents /100).toFixed(2)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary"
                    data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${delivryOptionsHTML(matchingProduct,cartItem)}
                </div>
              </div>
            </div>`;
  });

  let html = '';

  function delivryOptionsHTML(matchingProduct,cartItem) {
    let html = '';
    delivryOptions.forEach((delivryOption) => {
      const today = dayjs();
      const delivryDate = today.add(
        delivryOption.delivryDays,
        'days'
      );
      const dateStr = delivryDate.format(
        'dddd, MMMM D'
      );

      const priceStr = delivryOption.priceCents === 0 ? 'free' : `$${delivryOption.priceCents / 100} -`;
      const isChecked = delivryOption.id === cartItem.delivryOptionId
      html += `
                  <div class="delivery-option"
                  data-product-id="${matchingProduct.id}"
                  data-delivry-option-id="${delivryOption.id}">
                    <input type="radio"
                    ${isChecked ? 'checked' : '' }
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateStr}
                      </div>
                      <div class="delivery-option-price">
                        ${priceStr} Shipping
                      </div>
                    </div>
                  </div>
    
    `
    });
  return html;
  }



  document.querySelector(('.order-summary')).innerHTML = productGridHTML;

  cartCounter('return-to-home-link');

  document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click' , () => {
      const productId = link.dataset.productId;
      DeleteFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      renderPaymentSummary();
      cartCounter('return-to-home-link');
    })
  })



  document.querySelectorAll('.delivery-option').forEach((element)=>{
    element.addEventListener('click', () => {
      const {productId, delivryOptionId} = element.dataset;
      updateDelivryOption(productId,delivryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}