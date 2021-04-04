import axios from "axios";
import { signup, login, checkStatus } from './endpoints/auth';
import { get as getRooms, create as createRoom } from './endpoints/room';
import { searchYouTube, searchSoundCloud } from './endpoints/external';

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
    auth: {
        signup,
        login,
        checkStatus
    },
    rooms: {
        get: getRooms,
        create: createRoom
    },
    external: {
        searchYouTube,
        searchSoundCloud
    }
}