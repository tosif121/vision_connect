import axios from 'axios';

const API_BASE_URL = process.env.API_URL || 'https://vision-connect-backend.vercel.app/api';
console.log(API_BASE_URL)
export const createProject = async (formData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-projects`, formData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-projects`);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};
