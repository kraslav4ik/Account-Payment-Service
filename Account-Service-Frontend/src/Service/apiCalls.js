import { getDefaultNormalizer } from "@testing-library/react";

const getAdminTable = () => [
  {
    id: 1,
    email: "abc123@gmail.com",
    nameOfUser: "Slava",
    surname: "Krasnoperov",
    roles: ["ROLE_ADMIN"],
    accountNonLocked: true,
  },
  {
    id: 2,
    email: "abc123@gmail.com",
    nameOfUser: "Slava",
    surname: "Krasnoperov",
    roles: ["ROLE_ADMIN", "ROLE_ACCOUNTANT"],
    accountNonLocked: true,
  },
  {
    id: 3,
    email: "abc123@gmail.com",
    nameOfUser: "Slava",
    surname: "Krasnoperov",
    roles: ["ROLE_ACCOUNTANT"],
    accountNonLocked: false,
  },
];

const registerUser = (email, password, nameOfUser, surname) => {
  return {
    id: 1,
    email: email,
    nameOfUser: nameOfUser,
    surname: surname,
    role: ["ROLE_ADMIN"],
  };
};

const login = (email, password) => ({
  id: 1,
  email: email,
  nameOfUser: "Slava",
  surname: "Krasnoperov",
  roles: ["ROLE_ADMIN"],
});

let cookiePersist = true;

const getCurrentUserByQuerry = () =>
  cookiePersist
    ? {
        id: 1,
        email: "slavak540@gmail.com",
        nameOfUser: "Slava",
        surname: "Krasnoperov",
        roles: ["ROLE_ADMIN", "ROLE_ACCOUNTANT"],
      }
    : null;

const removeJwtCookie = () => {
  console.log("NO more cookie");
  cookiePersist = false;
};

const deleteUser = (email) =>
  new Promise((resolve, reject) => {setTimeout(() => {resolve(email)}, 3000)});

export {
  registerUser,
  login,
  getCurrentUserByQuerry,
  removeJwtCookie,
  getAdminTable,
  deleteUser,
};
