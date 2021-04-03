import axios from "axios";
import { signup } from './endpoints/auth';

export const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
});

export const PartyHut = {
    auth: {
        signup
    }
}