import axios from "axios";
const API_URL = "http://localhost:8000";
const DEV_API_URL = "http://localhost:8000";
const fetchConferenceById = async (id = 1) => {
   try {
      const response = await axios.get(`${DEV_API_URL}/conference_page/c/${id}/`);
      return response.data;
   } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
   }
};
const fetchSurveysById = async (id = 1) => {
   try {
      const response = await axios.get(`${API_URL}/conference_page/surveys/s/${id}/`);
      console.log(response)
      return response.data;
   } catch (error) {
      console.error("Error fetching surveys:", error);
      throw error;
   }
};
const createSurveyAnswerById = async (payload) => {
   try {
      const response = await axios.post(`${API_URL}/conference_page/surveys/answers/create/`, payload);
      return response.data;
   } catch (error) {
      console.error("Error fetching surveys:", error);
      throw error;
   }
};
const getSurveyAnswers = async (surveyId) => {
   try {
      const response = await axios.get(`${API_URL}/conference_page/surveys/answers/?filter[related_survey]=${surveyId}`);
      return response.data;
   } catch (error) {
      console.error("Error fetching surveys:", error);
      throw error;
   }
};
export { fetchConferenceById, fetchSurveysById, createSurveyAnswerById, getSurveyAnswers };

