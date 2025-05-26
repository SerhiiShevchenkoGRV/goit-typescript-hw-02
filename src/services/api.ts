import axios from "axios";
import { FetchImagesResponse } from "../components/App/App.types";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImagesByQuery = async (
  userQuery: string,
  page: number
): Promise<FetchImagesResponse> => {
  const MY_ACCESS_KEY = import.meta.env.VITE_API_KEY;

  const response = await axios.get<FetchImagesResponse>("/search/photos", {
    headers: {
      "Accept-Version": "v1",
      Authorization: `Client-ID ${MY_ACCESS_KEY}`,
    },
    params: {
      query: userQuery,
      per_page: 20,
      page,
    },
  });

  return response.data;
};
