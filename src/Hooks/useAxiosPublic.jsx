import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://green-shelter-server-a-12.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
