import { REACT_APP_HOST } from "../lib/constants";

export const addTowishlistProduct = async (id, payload) => {
  return await fetch(`${REACT_APP_HOST}/add-to-wishlist/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};

export const removeFromWishlistProduct = async (id, payload) => {
    return await fetch(`${REACT_APP_HOST}/remove-from-wishlist/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };

  export const addToCartlistProduct = async (id, payload) => {
    return await fetch(`${REACT_APP_HOST}/add-to-cart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };
  
  export const removeFromCartlistProduct = async (id, payload) => {
      return await fetch(`${REACT_APP_HOST}/remove-from-cart/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          return err;
        });
    };