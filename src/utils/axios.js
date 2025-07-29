import axios from "axios";
import toast from "react-hot-toast";

const HOST_API_KEY = import.meta.env.VITE_API_BASE_URL;

const AxiosClient = async (args) => {
  const { toolkit, headers = {}, data, ...rest } = args;

  const isFormData = data instanceof FormData;

  return axios({
    baseURL: `${HOST_API_KEY}`,
    ...rest,
    data, // Pass data as it is (FormData or JSON)
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      Authorization: `${localStorage?.getItem("token")}` || null,
      ...headers,
    },
  })
    .then((response) => toolkit.fulfillWithValue(response.data))
    .catch((error) => toolkit.rejectWithValue(error.response.data));
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response.data.message, {
      position: "top-right",
    });

    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      window.location.href = "/";
    }
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default AxiosClient;
