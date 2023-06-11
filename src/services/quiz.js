import axios from "axios";
const API_URL = "http://127.0.0.1:8000";
const fetchQuizzes = async () => {
   try {
      const response = await axios.get(`${API_URL}/quiz/`);
      return response.data;
   } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
   }
};
const fetchQuiz = async (quizId) => {
   try {
      const response = await axios.get(`${API_URL}/quiz/q/${quizId}/`);
      return response.data;
   } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
   }
};

export { fetchQuizzes, fetchQuiz };
