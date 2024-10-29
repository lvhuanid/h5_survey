import axios from "axios";

export const initAxios = (dispatch) => {
  axios.defaults.baseURL = "http://8.153.101.160:8080/api";
  axios.defaults.validateStatus = (status) => {
    if ([401, 500, 504].includes(status)) {
      dispatch("401");
    }
    return true;
  };
  axios.defaults.timeout = 55000;
};

export const requestAxios = async (request, parameter, timeout) => {
  try {
    const rs = await axios.post(
      request,
      parameter ?? {},
      timeout ? { timeout } : {}
    );
    if (rs.status === 404) {
      const message = "fail";
      return { data: { apiResult: "fail", apiMessage: message, message } };
    }
    return rs;
  } catch (er) {
    let message = `${er.name}: ${er.message}`;
    if (er.name === "AxiosError" && er.message.startsWith("timeout of ")) {
      message = message = "fail";
    }
    return { data: { apiResult: "fail", apiMessage: message, message } };
  }
};

export const apiGet1 = async ({ showMessage = true, timeout, ...data }) => {
  const rs = await requestAxios(`ping`, data, timeout);
  return rs;
};
