import axios from "axios";
import * as auth from './endpoints/auth';
import * as rooms from './endpoints/room';
import * as playlist from './endpoints/playlist';
import * as external from './endpoints/external';

export const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
});

export const SoundCloudAPI = axios.create({
    baseURL: "https://api.soundcloud.com",
    params: {
        client_id: "122157bfa7aa5b445923b3d867158b8f"
    }
})

export const PartyHut = {
    auth,
    rooms,
    playlist,
    external
};