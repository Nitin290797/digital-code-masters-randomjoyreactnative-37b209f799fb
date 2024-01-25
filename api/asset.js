import axios from "axios";
import { config } from "../config/config";

export const randomAsset = async (token, type) => {
    const url = `${config.baseUrl}${config.asset}?type=${type}`;
    console.log('abc', token)
    const headers = {
        "Authorization": `${token}`
    }
    return axios.get(url, {
        headers
    })
                    .then(data => data)
                    .catch(err => { throw err });
}

export const shareAsset = async (token, id) => {
    const url = `${config.baseUrl}${config.shareAsset}/${id}`
    const headers = {
        "Authorization": `${token}`
    }
    return axios.get(url, {
        headers
    })
    .then(data => data)
    .catch(err => { throw err });
}

export const shareCommitAsset = async (token, id, commitId) => {
    const url = `${config.baseUrl}${config.shareAsset}/${id}/${commitId}`
    const headers = {
        "Authorization": `${token}`
    }
    return axios.get(url, {
        headers
    })
    .then(data => data)
    .catch(err => { throw err });
}

export const notifications = async (token, id) => {
    const url = `${config.baseUrl}${config.notifications}`
    const headers = {
        "Authorization": `${token}`
    }
    return axios.get(url, {
        headers
    })
    .then(data => data)
    .catch(err => { throw err });
}