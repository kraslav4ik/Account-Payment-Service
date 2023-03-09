import { Ajax, handleError } from "./Ajax";

const registerUser = (email, password, nameOfUser, lastname) =>
  Ajax("api/auth/signup", "POST", {
    name: nameOfUser,
    lastname: lastname,
    email: email,
    password: password,
  });

const login = (email, password) => {
  return Ajax("api/auth/login", "POST", {
    username: email,
    password: password,
  });
};

const changePassword = (newPassword) => Ajax("/api/auth/changepass", "POST", {"new_password": newPassword})

const getCurrentUserByQuerry = () => Ajax("/api/auth/verifyJWT", "GET");

const removeJwtCookie = () =>
  Ajax("/api/auth/signout", "POST")
    .then(() => console.log("JWT deleted"))
    .catch((response) => handleError(response));

const getUserPayments = () => Ajax("api/empl/payment", "GET");

const getSinglePayment = (period) =>
  Ajax(`api/empl/payment?period=${period}`, "GET");

const getAdminTable = () => Ajax("/api/admin/user", "GET");

const deleteUser = (email) => Ajax(`/api/admin/user/${email}`, "DELETE");

const grantRole = (email, role) =>
  Ajax("/api/admin/user/role", "PUT", {
    user: email,
    role: role,
    operation: "GRANT",
  });

const deleteRole = (email, role) =>
  Ajax("/api/admin/user/role", "PUT", {
    user: email,
    role: role,
    operation: "REMOVE",
  });

const lockUser = (email) =>
  Ajax("/api/admin/user/access", "PUT", { user: email, operation: "LOCK" });

const unlockUser = (email) =>
  Ajax("/api/admin/user/access", "PUT", { user: email, operation: "UNLOCK" });

const getAllPayments = () => Ajax("/api/acct/payments", "GET");

const updatePayment = (payment) => Ajax("/api/acct/payments", "PUT", payment);

const deletePayment = (paymentInfo) => Ajax("/api/acct/payments", "DELETE", paymentInfo);

export {
  lockUser,
  unlockUser,
  deleteRole,
  grantRole,
  registerUser,
  login,
  changePassword,
  getCurrentUserByQuerry,
  removeJwtCookie,
  getAdminTable,
  deleteUser,
  getUserPayments,
  getSinglePayment,
  getAllPayments,
  updatePayment,
  deletePayment
};
