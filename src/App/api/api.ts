import axios from "axios";
import { signup, login, checkStatus } from './endpoints/auth';
import { get as getRooms, create as createRoom } from './endpoints/room'

export const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
});

export const PartyHut = {
    auth: {
        signup,
        login,
        checkStatus
    },
    rooms: {
        get: getRooms,
        create: createRoom
    }
}