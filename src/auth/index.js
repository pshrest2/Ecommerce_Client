import { API } from "../config";

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    return res.json();
  });
  // .catch((err) => {
  //   console.log(err);
  // });  // is this necessary?
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    return res.json();
  });
  // .catch((err) => {
  //   console.log(err);
  // });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((res) => {
        console.log("signout", res);
      })
      .catch((err) => console.log(err));
  }
};
