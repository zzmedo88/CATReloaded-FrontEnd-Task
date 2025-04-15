const cart = {
    cartItems : undefined,

    loadFromStorage() {
        this.cartItmes=JSON.parse(localStorage.getItem('cart-oop'));

        if (!this.cartItems){
          this.cartItems = [{
            productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity : 2,
            delivryOptionId: '1'
          },{
            productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity : 1,
            delivryOptionId: '2'
          }];
        }},

        saveToStorage(){
            localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));
          },

          addToCart(productId) {
            let matchingItem;
          
            this.cartItems.forEach((item) => {
              if (productId == item.productId){
                matchingItem=item;
              }
            });
          
              if (matchingItem){
                matchingItem.quantity += 1;
              }
              else{
                this.cartItems.push({
                  productId,
                  quantity : 1,
                  delivryOptionId : '1'
                });
              }
            this.saveToStorage();
          },

          DeleteFromCart(productId) {
            const newCart =[];
          this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
              newCart.push(cartItem);
            }
          });
          this.cartItems = newCart;
          this.saveToStorage();
          },

          cartCounter(place) {
            let allQuantity=0;
            this.cartItems.forEach((item) => {
              allQuantity += item.quantity;
            })
            if (place == 'cart-quantity') {
              document.querySelector(`.${place}`).innerHTML=allQuantity;
            }
            else {
              let newHTML = `${allQuantity} items`
              document.querySelector(`.${place}`).innerHTML=newHTML;
            }
          },

          updateDelivryOption(productId, delivryOptionId) {
            let matchingItem;
          
            this.cartItems.forEach((item) => {
              if (productId == item.productId){
                matchingItem=item;
              }
            });
          
            matchingItem.delivryOptionId = delivryOptionId;
            this.saveToStorage();
          }
};

cart.loadFromStorage();
console.log(cart);