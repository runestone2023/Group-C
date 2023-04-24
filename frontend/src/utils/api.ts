import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { notiType, renderNotification } from "./helpers";

const api = axios.create({
  baseURL: "",
});

interface UseCallApiProps {
  endPoint: string;
  method: AxiosRequestConfig["method"];
  payload?: any;
  headers?: AxiosRequestConfig["headers"];
  params?: AxiosRequestConfig["params"];
}

interface UseCallApiResponse {
  response: AxiosResponse | null;
  error: any;
}

export const useCallApi = async ({
  endPoint,
  headers,
  method,
  params,
  payload,
}: UseCallApiProps): Promise<UseCallApiResponse> => {
  try {
    const result = await api({
      method,
      url: endPoint,
      headers,
      data: payload,
      params,
    });

    return {
      response: result,
      error: null,
    };
  } catch (error) {
    return {
      response: null,
      error,
    };
  }
};
