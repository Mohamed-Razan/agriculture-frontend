import axios from "axios";

const API_URL = "http://localhost:8080";

export const postAdvertisement = async (formData) => {
    axios.post(`${API_URL}/create-advertisement`, formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const getAllAdvertisement = async () => {
    try {
        const data = await axios.get(`${API_URL}/get-all-ad`);
        console.log(data.data)
        return data.data;
    }

    catch (error) {
        console.log(error);
    }
}

export const editAdvertisement = async (formData) => {
    axios.put(`${API_URL}/update-ad`, formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const deleteAdvertisement = async (id) => {
    try {
        await axios.delete(`${API_URL}/delete-ad/${id}`);
        console.log("deleted");
    }

    catch (error) {
        console.log(error);
    }
}