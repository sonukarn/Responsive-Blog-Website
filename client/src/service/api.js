import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";
import { getAccessToken, getType } from "../utils/common-utils";

const API_URL = "https://sonuwebtechblog.onrender.com";
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    Accept: "application/json,form-data",
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    //Stop global loader here
    return processResponse(response);
  },
  function (error) {
    //Stop global loader here
    return Promise.reject(processError(error));
  }
);
//////////////////////////////////////////////
// if success -> return {isSuccess:true,data:object}
// if fail -> return { isFailure:true, status:string, msg: string, code:int }
//////////////////////////////////////////////
const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};
//////////////////////////////////////////////
// if success -> return {isSuccess:true,data:object}
// if fail -> return { isFailure:true, status:string, msg: string, code:int }
//////////////////////////////////////////////
const processError = (error) => {
  if (error.response) {
    //Request made and server responded with a status other
    // that fail out of the range 2.x.x
    console.log("Error in Response:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response was received
    console.log("ERROR IN REQUEST:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    // something happended in setting up request that triggers an error
    console.log("ERROR IN NETWORK:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      headers: {
        authorization: getAccessToken(),
      },
      url: value.url,
      data: value.method === "DELETE" ? "" : body,
      responseType: value.responseType,
      TYPE: getType(value, body),
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
}
export { API };
