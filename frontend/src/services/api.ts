import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_SERVER_PORT}/api/analytics`;

// ✅ Get all forms
export const getForms = () => axios.get(`${BASE_URL}/forms`);

// ✅ Get all questions for a specific form
export const getQuestions = (formId: number | string) =>
  axios.get(`${BASE_URL}/forms/${formId}/questions`);

// ✅ Get aggregated analytics for a form (summary data)
export const getSessionAnalytics = (formId: number | string) =>
  axios.get(`${BASE_URL}/forms/${formId}/session-analytics`);

// ✅ Get average sentiment for a specific form
export const getAverageSentiment = (formId: number | string) =>
  axios.get(`${BASE_URL}/forms/${formId}/sentiment/average`);

// ✅ Get total responses for a specific form
export const getResponseCount = (formId: number | string) =>
  axios.get(`${BASE_URL}/forms/${formId}/responses/count`);

// ✅ Get average sentiment for all forms
export const getAllFormSentiments = () =>
  axios.get(`${BASE_URL}/forms/sentiment/average`);

// ✅ Get total response counts for all forms
export const getResponseCounts = () =>
  axios.get(`${BASE_URL}/forms/responses/count`);
