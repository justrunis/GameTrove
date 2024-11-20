import { QueryClient } from "@tanstack/react-query";
import {
  API_URL,
  API_KEY,
  GAMERPOWER_KEY,
  CHEAPSHARK_API_URL,
  GAMERPOWER_API_URL,
  SERVER_URL,
} from "../utils/constants";
import { getUserId } from "../auth/auth";

export const queryClient = new QueryClient();

/**
 * Generic function to fetch data from an API
 * @param {*} url - The URL to fetch data from
 * @returns - The JSON response from the API
 */
const fetchFromApi = async (url, options = null) => {
  try {
    const response = await fetch(url, options);

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

export const fetchGameSeries = async ({ id, page }) => {
  const url = `${API_URL}/games/${id}/game-series?key=${API_KEY}&page=${page}`;
  return fetchFromApi(url);
};

export const fetchGameDLC = async ({ id, page }) => {
  const url = `${API_URL}/games/${id}/additions?key=${API_KEY}&page=${page}`;
  return fetchFromApi(url);
};

export const fetchGamePrices = async ({ title }) => {
  const url = `${CHEAPSHARK_API_URL}/games?title=${title}`;
  return fetchFromApi(url);
};

// GIVEAWAYS
export const fetchGiveaways = async () => {
  const url = `${GAMERPOWER_API_URL}/filter?platform=epic-games-store.steam.android&sort-by=popularity`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": GAMERPOWER_KEY,
      "x-rapidapi-host": "gamerpower.p.rapidapi.com",
    },
  };

  return fetchFromApi(url, options);
};

// SERVER
const createRequestOptions = ({ method = "GET", body = null } = {}) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("game-trove-token")}`,
  };

  if (method !== "GET") {
    headers["Content-Type"] = "application/json";
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return options;
};

const apiRequest = async (url, options = null) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "An error occurred");
    }

    return response.json();
  } catch (error) {
    console.error(`Error in API request: ${error.message}`);
    throw error;
  }
};
export const createUser = async ({ userData }) => {
  const url = `${SERVER_URL}/auth/register`;
  const options = createRequestOptions({ method: "POST", body: userData });
  return apiRequest(url, options);
};

export const loginUser = async ({ userData }) => {
  const url = `${SERVER_URL}/auth/login`;
  const options = createRequestOptions({ method: "POST", body: userData });
  return apiRequest(url, options);
};

export const fetchAllUsers = async ({ page }) => {
  const url = `${SERVER_URL}/users?page=${page}`;
  const options = createRequestOptions();
  return apiRequest(url, options);
};

export const fetchUserProfile = async () => {
  const url = `${SERVER_URL}/users/profile`;
  const options = createRequestOptions();
  return apiRequest(url, options);
};

export const updateUser = async ({ id, userData }) => {
  const url = `${SERVER_URL}/users/${id}`;
  const options = createRequestOptions({ method: "PUT", body: userData });
  return apiRequest(url, options);
};

export const deleteUser = async ({ userId }) => {
  const url = `${SERVER_URL}/users/${userId}`;
  const options = createRequestOptions({ method: "DELETE" });
  return apiRequest(url, options);
};

export const fetchUserGamesProgress = async () => {
  const userId = getUserId(localStorage.getItem("game-trove-token"));
  const url = `${SERVER_URL}/userGameProgress/${userId}`;
  const options = createRequestOptions();
  return apiRequest(url, options);
};

export const fetchAllReviewsForGame = async ({ id }) => {
  const url = `${SERVER_URL}/userGameProgress/reviews/${id}`;
  const options = createRequestOptions();
  return apiRequest(url, options);
};

export const updateUserGameProgress = async ({ data }) => {
  const userId = getUserId(localStorage.getItem("game-trove-token"));
  const url = `${SERVER_URL}/userGameProgress/${userId}`;
  const options = createRequestOptions({ method: "PUT", body: data });
  return apiRequest(url, options);
};
