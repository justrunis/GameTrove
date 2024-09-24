import { QueryClient } from "@tanstack/react-query";
import { API_URL, API_KEY } from "../utils/constants";

export const queryClient = new QueryClient();

export const fetchGames = async ({ page, search = "" }) => {
  try {
    const response = await fetch(
      `${API_URL}/games?key=${API_KEY}&page=${page}&search=${search}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchGame = async ({ id }) => {
  try {
    const response = await fetch(`${API_URL}/games/${id}?key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    return error;
  }
};
