import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://han-mass.onrender.com/api/v1",
  withCredentials: true,
});

customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default customFetch;
