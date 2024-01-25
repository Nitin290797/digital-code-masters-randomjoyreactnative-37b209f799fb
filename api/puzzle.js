import axios from "axios";
import { config } from "../config/config";

export const randomPuzzle = async token => {
    const url = `${config.baseUrl}${config.puzzle}`;
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