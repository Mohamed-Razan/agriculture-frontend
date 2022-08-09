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

export const getAllSeller= async () => {
    try {
        const data = await axios.get(`${API_URL}/get-all-seller`);
        return data.data;
    }

    catch (error) {
        console.log(error);
    }
}

export const getSellerById= async () => {
    try {
        const data = await axios.get(`${API_URL}/get-seller/${1}`);
        return data.data;
    }

    catch (error) {
        console.log(error);
    }
}

export const editSeller = async (data) => {
    axios.put(`${API_URL}/update-seller`, data)
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