import { http } from "../http";

export const getSuggestions = async (query) => {
  const response = await http.get("/suggest", { params: { q: query } });
  const data = await response.data;
  return data.data;
};

export const postQuery = async (query) => {
  const response = await http.get("/search", { params: { q: query } });
  const data = await response.data;
  return data.data;
};
