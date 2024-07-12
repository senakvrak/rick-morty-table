import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character/";

export const fetchCharacters = async (
  page = 1,
  pageSize = 10,
  filters = {}
) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page, pageSize, ...filters },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
