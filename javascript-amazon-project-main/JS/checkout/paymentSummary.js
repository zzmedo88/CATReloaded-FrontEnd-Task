import {cart} from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { getDelivryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let cartQuantity = 0;
  
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    
    const delivryOption = getDelivryOption(cartItem.delivryOptionId);
    shippingPriceCents += delivryOption.priceCents;

    cartQuantity+=cartItem.quantity;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents ;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents ;

  const paymentSymmaryHTML = `
    <div class="payment-summary-title">
              Order Summary
            </div>
      
            <div class="payment-summary-row">
              <div class="">Items (${cartQuantity}):</div>
              <div class="payment-summary-money" data-testid="product-cost">
                $${(Math.round(productPriceCents) / 100).toFixed(2)}
              </div>
            </div>
      
            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money" data-testid="shipping-cost">
                $${(Math.round(shippingPriceCents) / 100).toFixed(2)}
              </div>
            </div>
      
            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money" data-testid="sub-total">
                $${(Math.round(totalBeforeTaxCents) / 100).toFixed(2)}
              </div>
            </div>
      
            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money" data-testid="tax-cost">
                $${(Math.round(taxCents) / 100).toFixed(2)}
              </div>
            </div>
      
            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money" data-testid="total-cost">
                $${(Math.round(totalCents) / 100).toFixed(2)}
              </div>
            </div>
          </div>

              <button class="place-order-button button-primary">
                Place your order
              </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSymmaryHTML;
}

