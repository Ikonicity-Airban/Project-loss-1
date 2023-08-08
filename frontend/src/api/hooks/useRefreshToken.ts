import { ILoginResponse } from "../@types";
import axios from "../https";
import { Types } from "../reducer";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { dispatch } = useAuth();

  const refresh = async () => {
    const response = await axios.get<ILoginResponse>("/refresh", {
      withCredentials: true,
    });
    console.log(response.data.access_token);
    dispatch({
      type: Types.login,
      payload: response.data,
    });
    return response.data.access_token;
  };
  return refresh;
};

export default useRefreshToken;
