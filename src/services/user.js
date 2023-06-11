import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const getUsers = async () => {
   try {
      const response = await axios.get(`${API_URL}/user/`);
      return response.data.categories;
   } catch (error) {
      console.error("Error while fetching user:", error);
      throw error;
   }
};

const createUser = async (user) => {
   try {
      const response = await axios.post(`${API_URL}/user/`, user);
      return response.data;
   } catch (error) {
      console.error("Error while creating user:", error);
      throw error;
   }
};

const updateUser = async (user) => {
   try {
      const response = await axios.put(`${API_URL}/user/update/`, user);
      return response.data;
   } catch (error) {
      console.error("Error while updating user:", error);
      throw error;
   }
};

const deleteUser = async (userId) => {
   try {
      await axios.delete(`${API_URL}/user/${userId}`);
      console.log("User deleted successfully");
   } catch (error) {
      console.error("Error while deleting user:", error);
      throw error;
   }
};

export { getUsers, createUser, updateUser, deleteUser };
