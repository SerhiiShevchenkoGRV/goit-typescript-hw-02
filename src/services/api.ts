import axios from "axios";
axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImagesByQuery = async (userQuery, page) => {
  const MY_ACCESS_KEY = import.meta.env.VITE_API_KEY;

  const response = await axios.get("/search/photos", {
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
  console.log(response.data);
  return response.data;
};
