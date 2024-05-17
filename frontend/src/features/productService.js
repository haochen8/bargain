import axios from "axios";

const getProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/products`
    );
    return response.data;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}

export { getProducts };