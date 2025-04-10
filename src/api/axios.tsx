import axios, { AxiosResponse } from "axios";

const BASE_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

export const getData = (pathname: string): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}${pathname}`);
};
