import axios from "axios";
import { config } from "../config/config";

export const categoryList = (token) => {
    const url = `${config.baseUrl}${config.category}`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token
    }
    return axios.get(url, {headers})
                    .then(data => data.data)
                    .catch(err =>  { throw err; });
}

export const saveInterest = (id ,payload, token) => {
    const url = `${config.baseUrl}${config.saveInterest}/${id}`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token
    }
    return axios.post(url, payload, {headers})
                    .then(data => data.data)
                    .catch(err =>  { throw err; });
}

export const skipInterest = (id, token) => {
    const url = `${config.baseUrl}${config.skipInterest}/${id}`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token
    }
    return axios.post(url, {}, {headers})
                    .then(data => data.data)
                    .catch(err =>  { throw err; });
}