export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart){
  cart = [{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2,
    delivryOptionId: '1'
  },{
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1,
    delivryOptionId: '2'
  }];
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId == item.productId){
      matchingItem=item;
    }
  });

    if (matchingItem){
      matchingItem.quantity += 1;
    }
    else{
      cart.push({
        productId,
        quantity : 1,
        delivryOptionId : '1'
      });
    }
  saveToStorage();
}

export function DeleteFromCart(productId) {
  const newCart =[];
cart.forEach((cartItem) => {
  if (cartItem.productId !== productId) {
    newCart.push(cartItem);
  }
});
cart = newCart;
saveToStorage();
}

export function cartCounter(place) {
  let allQuantity=0;
  cart.forEach((item) => {
    allQuantity += item.quantity;
  })
  if (place == 'cart-quantity') {
    document.querySelector(`.${place}`).innerHTML=allQuantity;
  }
  else {
    let newHTML = `${allQuantity} items`
    document.querySelector(`.${place}`).innerHTML=newHTML;
  }
}


export function updateDelivryOption(productId, delivryOptionId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId == item.productId){
      matchingItem=item;
    }
  });

  matchingItem.delivryOptionId = delivryOptionId;
  saveToStorage();
}