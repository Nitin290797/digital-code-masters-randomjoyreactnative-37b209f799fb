import axios from "axios";
import { config } from "../config/config";

export const asset = async payload => {
    const url = `${config.baseUrl}${config.asset}`;
    const headers = {
        "Content-Type": "application/json"
    }
    return axios.post(url, payload, {headers})
                    .then(data => data.data)
                    .catch(err => err);
}