import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { httpPrivate } from "../https";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const {
    state: { LoggedUser: auth },
  } = useAuth();

  useEffect(() => {
    const requestIntercept = httpPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = httpPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return httpPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      httpPrivate.interceptors.request.eject(requestIntercept);
      httpPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return httpPrivate;
};

export default useAxiosPrivate;
