import axios from "axios";
import useRefreshToken from "./useRefreshToken";
import {useEffect } from "react";
import { useAuth } from "../context/GlobalStates";

const client = axios.create({
    baseURL: "http://35.223.65.194" 
  });

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {authState} = useAuth()

    useEffect(() => {

        const requestIntercept = client.interceptors.request.use(
            async config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${authState?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = client.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return client(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
          client.interceptors.request.eject(requestIntercept);
          client.interceptors.response.eject(responseIntercept);
        }
    }, [authState, refresh])

    return client;
}

export {client, useAxiosPrivate}