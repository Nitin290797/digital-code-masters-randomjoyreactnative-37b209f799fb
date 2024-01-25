import axios from "axios";
import { config } from "../config/config";

export const login = async payload => {
    const url = `${config.baseUrl}${config.login}`;
    const headers = {
        "Content-Type": "application/json"
    }
    return axios.post(url, payload, {headers})
                    .then(data => data.data)
                    .catch(err => { throw err });
}

export const register = async payload => {
    const url = `${config.baseUrl}${config.register}`;
    const headers = {
        "Content-Type": "application/json"
    }
    return axios.post(url, payload, {headers})
                    .then(data => data)
                    .catch(err => { throw err });
}

export const update = async (payload, id, token) => {
    const url = `${config.baseUrl}${config.update}/${id}`;
    const headers = {
        "Authorization": `${token}`
    }
    return axios.patch(url, payload, {headers})
                    .then(data => data)
                    .catch(err => { throw err });
}

export const details = async token => {
    const url = `${config.baseUrl}${config.details}`;
    console.log('abc', token)
    const headers = {
        "Authorization": `${token}`
    }
    return axios.get(url, {
        headers
    })
                    .then(data => data.data)
                    .catch(err => { throw err });
}