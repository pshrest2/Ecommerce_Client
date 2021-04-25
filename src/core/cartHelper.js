//add item to cart(local storage)
export const addItem = (item, next) => {
  let cart = [];

  if (typeof window != "undefined") {
    let localStorageItem = localStorage.getItem("cart");
    if (localStorageItem) {
      cart = JSON.parse(localStorageItem);
    }
    cart.push({
      ...item,
      count: 1,
    });

    /*
    - Remove all duplicates
    - Build an Array from new Set and turn it back into array using Array.from
        so that later we can re-map it
    - New Set will only allow unique values in it thus, pass the ids of each object/product
    - If the loop tries to add the same value again, it will get ignored
    - With the array of ids we got on when first map() was used,run map() on it again and return the actual product from the cart
    */

    cart = Array.from(new Set(cart.map((product) => product._id))).map((id) => {
      return cart.find((product) => product._id === id);
    });

    //set the cart item in local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

//get total items in the cart
export const totalItems = () => {
  if (typeof window != "undefined") {
    let localStorageItem = localStorage.getItem("cart");
    if (localStorageItem) {
      return JSON.parse(localStorageItem).length;
    }
  }
  return 0;
};

//get all cart items
export const getCartItems = () => {
  if (typeof window != "undefined") {
    let localStorageItem = localStorage.getItem("cart");
    if (localStorageItem) {
      return JSON.parse(localStorageItem);
    }
  }
  return [];
};

//update an item's count value in the cart
export const updateItem = (id, count) => {
  let cart = [];
  if (typeof window != "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    //loop over each cart item until the desired one is found
    cart.map((product, index) => {
      if (product._id === id) {
        cart[index].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

//remove an item from the cart
export const removeItem = (id) => {
  let cart = [];
  if (typeof window != "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    //loop over each cart item until the desired one is found
    cart.map((product, index) => {
      if (product._id === id) {
        //use .splice method to remove the item
        cart.splice(index, 1);
      }
    });

    //add the new cart array to the local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

//empty the cart. This is used when user logs out
export const emptyCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};

//warning message for users if product quantity is < 10
export const showProductQuantity = (product) => {
  if (product.quantity < 10) {
    return (
      <div className="limitedProduct">Only {product.quantity} items left!</div>
    );
  }
};
