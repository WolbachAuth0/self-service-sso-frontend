import axios from "axios";
const environ = import.meta.env;

/**
 * ENVIRON CONSTANTS
 */
const AUDIENCE = environ.VITE_API_AUDIENCE
const API_BASEURL = environ.VITE_BACKEND_DOMAIN

function http(accesstoken=null, timeout = 0) {
  const request = {
    baseURL: API_BASEURL,
    timeout,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  if (accesstoken) {
    request.headers["Authorization"] = `Bearer ${accesstoken}`;
  }
  const http = axios.create(request);
  return http;
}

async function get(auth, url) {
  try {
    const accesstoken = await auth.getAccessTokenSilently();
    const response = await http(accesstoken).get(url);
    return response.data;
  } catch (error) {
    return httpErrorHandler(error)
  }
}

async function put(auth, url, data) {
  try {
    const accesstoken = await auth.getAccessTokenSilently();
    const response = await http(accesstoken).put(url, data);
    return response.data;
  } catch (error) {
    return httpErrorHandler(error)
  }
}

async function patch(auth, url, data) {
  try {
    const accesstoken = await auth.getAccessTokenSilently();
    const response = await http(accesstoken).patch(url, data);
    return response.data;
  } catch (error) {
    return httpErrorHandler(error)
  }
}

async function post(auth, url, data) {
  try {
    const accesstoken = await auth.getAccessTokenSilently();
    const response = await http(accesstoken).post(url, data);
    return response.data;
  } catch (error) {
    return httpErrorHandler(error)
  }
}

async function remove(auth, url) {
  try {
    const accesstoken = await auth.getAccessTokenSilently();
    const response = await http(accesstoken).delete(url);
    return response.data;
  } catch (error) {
    return httpErrorHandler(error)
  }
}

function httpErrorHandler (err) {
  if (err?.response?.status == 401) {
    return err.response.data;
  } else if (err?.response?.status == 429) {
    return err.response.data
  }
  console.log(err)
  return err
}

export default {
  get,
  put,
  patch,
  post,
  delete: remove
}
