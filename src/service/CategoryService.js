import axios from "axios";

const API_URL = "http://localhost:8080";

export const postCategory = async (data) => {
    axios.post(`${API_URL}/create-category`, data)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const getCategoryById = async (id) => {
    try {
        const data = await axios.get(`${API_URL}/get-category/${id}`);
        return data.data;
    }

    catch (error) {
        console.log(error);
    }
}

export const getAllCategory = async () => {
    try {
        const data = await axios.get(`${API_URL}/get-all-category`);
        return data.data;
    }

    catch (error) {
        console.log(error);
    }
}

export const editCategory = async (data) => {
    axios.put(`${API_URL}/update-category`, data)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const deleteCategory = async (id) => {
    try {
        await axios.delete(`${API_URL}/delete-category/${id}`);
        console.log("deleted");
    }

    catch (error) {
        console.log(error);
    }
}