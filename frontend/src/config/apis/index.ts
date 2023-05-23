import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiEndPointPayload } from "./payload";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080",
});

interface UseCallApiProps {
  endPoint: string;
  method: AxiosRequestConfig["method"];
  payload?: ApiEndPointPayload;
  headers?: AxiosRequestConfig["headers"];
  params?: AxiosRequestConfig["params"];
}

interface UseCallApiResponse {
  response: AxiosResponse | null;
  error: unknown;
}

export const useCallApi = async (
  props: UseCallApiProps
): Promise<UseCallApiResponse> => {
  const { endPoint, headers, method, params, payload } = props;

  try {
    const result = await api.request({
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
