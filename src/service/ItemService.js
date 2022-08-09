import axios from "axios";

const API_URL = "http://localhost:8080";

export const postItem = async (formData) => {
    axios.post(`${API_URL}/create-item`, formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const getAllItem = async () => {
    try {
        const data = await axios.get(`${API_URL}/get-all-item`);
        return data.data;
    }

    catch (error) {
        console.log(error);
    }
}

export const getItemById = async (id) => {
    try {
        const data = await axios.get(`${API_URL}/get-item-by-id/${id}`);
        return data.data;
    }

    catch (error) {
        console.log(error);
    }
}

export const editItem = async (formData) => {
    axios.put(`${API_URL}/update-item`, formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const deleteItem = async (id) => {
    try {
        await axios.delete(`${API_URL}/delete-item/${id}`);
        console.log("deleted");
    }

    catch (error) {
        console.log(error);
    }
}