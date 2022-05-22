import axios from "axios";
import {
  dataOkResponse,
  dataErrorResponse,
} from "../store/redusers/loginReduser";
import { dataResTopGamer } from "../store/redusers/topGamerReduser";
import { HTTP_REQ_LOCAL } from "./constant";
var config = {
  headers: { "Acces-Control_Allow_Origin": "*" },
};
export const SendDataApi = (name, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${HTTP_REQ_LOCAL}api/user`,
        {
          name,
          password,
        },
        config
      );

      dispatch(dataOkResponse(res.data));
      console.log(res);
    } catch (error) {
      dispatch(dataErrorResponse(error.response));
    }
  };
};
export const SendIdGamerPoint = async (stateId, point) => {
  try {
    await axios.post(
      `${HTTP_REQ_LOCAL}api/point`,
      {
        stateId,
        point,
      },
      config
    );
  } catch (error) {
    console.error(error);
  }
};
export const TopGamer = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${HTTP_REQ_LOCAL}api/topGamer`, config);
      dispatch(dataResTopGamer(res.data));
    } catch (error) {
      console.error(error);
    }
  };
};
