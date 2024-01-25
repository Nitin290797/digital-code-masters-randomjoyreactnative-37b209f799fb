import axios from "axios";
import { config } from "../config/config";

export const statementSuggestion = async (token) => {
  const url = `${config.baseUrl}${config.suggestStatement}`;
  console.log("abc", token);
  const headers = {
    Authorization: `${token}`,
  };
  return axios
    .get(url, {
      headers,
    })
    .then((data) => data)
    .catch((err) => {
      throw err;
    });
};

export const statementCommitment = async (token) => {
  const url = `${config.baseUrl}${config.suggestCommitment}`;
  console.log("abc", token);
  const headers = {
    Authorization: `${token}`,
  };
  return axios
    .get(url, {
      headers,
    })
    .then((data) => data)
    .catch((err) => {
      throw err;
    });
};

export const assignCommitment = async (token, payload) => {
  const url = `${config.baseUrl}${config.assignCommitment}`;
  const headers = {
    Authorization: `${token}`,
  };
  return axios
    .post(url, payload, { headers })
    .then((data) => data.data)
    .catch((err) => {
      throw err;
    });
};

export const assignStatement = async (token, payload) => {
  const url = `${config.baseUrl}${config.assignStatement}`;
  const headers = {
    Authorization: `${token}`,
  };
  return axios
    .post(url, payload, { headers })
    .then((data) => data.data)
    .catch((err) => {
      throw err;
    });
};

export const getCommitments = async (token) => {
  const url = `${config.baseUrl}${config.commitments}`;
  const headers = {
    Authorization: `${token}`,
  };
  return axios
    .get(url, { headers })
    .then((data) => data.data)
    .catch((err) => {
      throw err;
    });
};

export const completeCommitment = async (token, id) => {
  const url = `${config.baseUrl}${config.completeCommitment}/${id}`;
  const headers = {
    Authorization: `${token}`,
  };
  return axios
    .patch(url, {}, { headers })
    .then((data) => data.data)
    .catch((err) => {
      throw err;
    });
};
