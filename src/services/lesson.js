import axios from "axios";
const API_URL = "http://127.0.0.1:8000";
const fetchCategories = async () => {
   try {
      const response = await axios.get(`${API_URL}/lesson/category/`);
      return response.data;
   } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
   }
};

// const createCategory = async (categoryData) => {
//    try {
//       const response = await axios.post("/api/categories/", categoryData);
//       return response.data;
//    } catch (error) {
//       console.error("Error creating category:", error);
//       throw error;
//    }
// };

// Service for Lessons
const fetchLessons = async () => {
   try {
      const response = await axios.get(`${API_URL}/lesson/lesson/`);
      return response.data;
   } catch (error) {
      console.error("Error fetching lessons:", error);
      throw error;
   }
};

// const createLesson = async (lessonData) => {
//    try {
//       const response = await axios.post("/api/lessons/", lessonData);
//       return response.data;
//    } catch (error) {
//       console.error("Error creating lesson:", error);
//       throw error;
//    }
// };

// Service for Contents
const fetchContents = async () => {
   try {
      const response = await axios.get(`${API_URL}/lesson/content/`);
      return response.data;
   } catch (error) {
      console.error("Error fetching contents:", error);
      throw error;
   }
};

const fetchConferences = async () => {
   try {
      const response = await axios.get(`${API_URL}/lesson/conference/`);
      return response.data.contents;
   } catch (error) {
      console.error("Error fetching contents:", error);
      throw error;
   }
};

const createConference = async (conferenceData) => {
   try {
      const response = await axios.post(`${API_URL}/lesson/conference/`, conferenceData);
      return response.data;
   } catch (error) {
      console.error("Error creating conference:", error);
      throw error;
   }
};

const fetchData = async () => {
   try {
      const [categories, lessons, contents] = await Promise.all([fetchCategories(), fetchLessons(), fetchContents()]);

      const data = {
         categories: categories.categories,
         lessons: lessons.lessons,
         contents: contents.contents,
      };
      return data;
      // Process the retrieved data as needed
   } catch (error) {
      console.error("Error fetching data:", error);
   }
};

// const createContent = async (contentData) => {
//    try {
//       const response = await axios.post("/api/contents/", contentData);
//       return response.data;
//    } catch (error) {
//       console.error("Error creating content:", error);
//       throw error;
//    }
// };
export { fetchCategories, fetchLessons, fetchContents, fetchData, fetchConferences, createConference };
