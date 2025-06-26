import { axiosWrapper } from "./axiosWrapper";

// API Endpoints

// Auth Endpoints
export const login = (data) => axiosWrapper.post("/user/login", data);
export const register = (data) => axiosWrapper.post("/user/register", data);
export const getUserData = () => axiosWrapper.get("/user");
export const logout = () => axiosWrapper.post("/user/logout");

// Table Endpoints
export const addTable = (data) => axiosWrapper.post("/table/", data);
export const getTables = () => axiosWrapper.get("/table");
export const updateTable = ({ tableId, ...tableData }) =>
  axiosWrapper.put(`/table/${tableId}`, tableData);

// Payment Endpoints
export const createOrderRazorpay = (data) =>
  axiosWrapper.post("/payment/create-order", data);
export const verifyPaymentRazorpay = (data) =>
  axiosWrapper.post("/payment/verify-payment", data);

// Order Endpoints
export const addOrder = (data) => axiosWrapper.post("/order/", data);
export const getOrders = () => axiosWrapper.get("/order");
export const updateOrderStatus = ({ orderId, orderStatus }) =>
  axiosWrapper.put(`/order/${orderId}`, { orderStatus });
