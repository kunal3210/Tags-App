import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const fetchTree = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tags/tree/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tree:", error);
        throw error;
    }
};

export const updateTree = async (treeData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/tags/tree/update`, treeData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating tree:", error);
        throw error;
    }
};
