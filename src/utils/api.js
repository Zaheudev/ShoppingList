import axios from 'axios';

// Set up the base URL for the API
const API_BASE_URL = "http://localhost:5000/api"; // Update this if needed

// config for sending the jwt token to pass the authmiddleware
let config = () => { return {headers: {Authorization:"Bearer " + localStorage.getItem("authToken")}}}

/**
 * Generic API error handler
 */
const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data.message || "An error occurred.");
  } else if (error.request) {
    console.error("API Error: No response received from the server.");
  } else {
    console.error("API Error:", error.message);
  }
  throw error; // Rethrow the error for component handling
};

/**
 * Fetch all shopping lists
 */
export const getShoppingLists = async (token) => {
    try {
    const response = await axios.get(`${API_BASE_URL}/shoppingLists`, token ? token : config());
    // console.log(response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Fetch a specific shopping list by ID
 */
export const getShoppingList = async (listId, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shoppingLists/${listId}`, token ? token : config());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Create a new shopping list
 */
export const createShoppingList = async (newList, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shoppingLists`,newList ,token ? token : config());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Update an existing shopping list
 */
export const updateShoppingList = async (listId, updates, token) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/shoppingLists/${listId}`, updates, token ? token : config());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Delete a shopping list by ID
 */
export const deleteShoppingList = async (listId, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/shoppingLists/${listId}`, token ? token : config(), {params: listId});
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * User authentication: Login
 */
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    // const notifications = await axios.get(`${API_BASE_URL}/notifications`, config());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * User authentication: Register
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * creates new Items for a certain shopping list
 */

export const addNewItems = async (listId, item, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/items/${listId}`, item, token ? token : config(), {params: listId});
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * accepts an invite to a shopping list
 */
export const acceptInvite = async (notification) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/users`, {notification}, config());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * refuses an invite to a shopping list
 */
export const refuseInvite = async (notification) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/notifications/${notification}`, config(), {params: notification});
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const inviteMember = async (listId, email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/notifications/${listId}`, {email}, config());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * deletes a given item from the invoked list 
 */
export const deleteItem = async (listId, item) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/items/${listId}/${item}`, config(), item);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Set an item unsolved or solved. 
 */
export const resolveItem = async (listId, item) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/items/${listId}/${item}`, item, config());
    return response.data;
  }catch(error){
    handleApiError(error);
  }
}

/**
 * Fetch user notifications
 */
export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications`, config());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Mark a notification as read
 */
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/notifications/${notificationId}`, {
      read: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export default {
  getShoppingLists,
  getShoppingList,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
  loginUser,
  registerUser,
  getNotifications,
  markNotificationAsRead,
  addNewItems,
  acceptInvite,
  refuseInvite
};
