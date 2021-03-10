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
    - Remove duplicates
    - Build an Array from new Set and turn it back into array using Array.from
        so that leter we can re-map it
    - new Set will only allow unique values in it
    - Thus, pass the ids of each object/product
    - If the loop tries to add the same value again, it will get ignored
    - ...with the array of ids we got on when first map() was used
    - run map() on it again and return the actual product from the cart
    */

    cart = Array.from(new Set(cart.map((product) => product._id))).map((id) => {
      return cart.find((product) => product._id === id);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const totalItems = () => {
  if (typeof window != "undefined") {
    let localStorageItem = localStorage.getItem("cart");
    if (localStorageItem) {
      return JSON.parse(localStorageItem).length;
    }
  }
  return 0;
};
