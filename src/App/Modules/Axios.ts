import axios from "axios";

export const API = axios.create({
    baseURL: "http://192.168.68.134:4000",
    withCredentials: true
})

export const SoundCloudAPI = axios.create({
    baseURL: "https://api.soundcloud.com",
    params: {
        client_id: "122157bfa7aa5b445923b3d867158b8f"
    }
})