import axios from 'axios';

const BASE_URL = 'https://localhost:7275';

export const getStaff = () => axios.get(`${BASE_URL}/api/Staff`);
export const addStaff = (staff) => axios.post(`${BASE_URL}/api/Staff`, staff);
export const getOrdersByStaffId = (staffId) => axios.get(`${BASE_URL}/api/Order/${staffId}`);
export const addOrder = (order) => axios.post(`${BASE_URL}/api/Order`, order);
export const deleteOrder = (orderId) => axios.delete(`${BASE_URL}/api/Order/${orderId}`);
export const getProducts = () => axios.get(`${BASE_URL}/api/Product`);
