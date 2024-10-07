// Thay đổi import từ axios:
import axios from './custom_axios';

const fetchAllProducts = async () => {
    try {
        const response = await axios.get("/products");
        console.log(">>>>CHECK DATA", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data", error);
        return [];
    }
}
export { fetchAllProducts }