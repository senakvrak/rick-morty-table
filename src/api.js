import axios from "axios";

// API URL'si, Rick and Morty API'sinin karakter verilerini sağlar.
const API_URL = "https://rickandmortyapi.com/api/character/";

// Karakter verilerini getiren asenkron fonksiyon.
// 'page' parametresi ve diğer filtreler fonksiyona argüman olarak geçirilir.
export const fetchCharacters = async (
  page = 1,
  pageSize = 10,
  filters = {}
) => {
  try {
    // API'ye GET isteği gönderilir ve sonuç döndürülür.
    const response = await axios.get(API_URL, {
      params: { page, pageSize, ...filters },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
