import { QueryClient } from "@tanstack/react-query";
import { API_URL, API_KEY } from "../utils/constants";

export const queryClient = new QueryClient();

/**
 * Generic function to fetch data from an API
 * @param {*} url - The URL to fetch data from
 * @returns - The JSON response from the API
 */
const fetchFromApi = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return response.json().then((data) => {
        throw new Error(data.detail || "An error occurred");
      });
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data from API", error);
    return error;
  }
};

export const fetchGames = async ({ page, search = "" }) => {
  const url = `${API_URL}/games?key=${API_KEY}&page=${page}&search=${search}`;
  return fetchFromApi(url);
};

export const fetchGame = async ({ id }) => {
  const url = `${API_URL}/games/${id}?key=${API_KEY}`;
  return fetchFromApi(url);
};

export const fetchGameScreenshots = async ({ id }) => {
  const url = `${API_URL}/games/${id}/screenshots?key=${API_KEY}`;
  return fetchFromApi(url);
};

export const fetchGameStores = async ({ id }) => {
  const url = `${API_URL}/games/${id}/stores?key=${API_KEY}`;
  return fetchFromApi(url);
};

export const fetchGameAchievements = async ({ id, page }) => {
  const url = `${API_URL}/games/${id}/achievements?key=${API_KEY}&page=${page}`;
  return fetchFromApi(url);
};

export const fetchGameSeries = async ({ id }) => {
  const url = `${API_URL}/games/${id}/game-series?key=${API_KEY}`;
  return fetchFromApi(url);
};
