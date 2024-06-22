import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export const substructLocation = (path) => {
  const splitPoint = "folders/";
  const index = path.indexOf(splitPoint);
  let result = "";
  if (index !== -1) {
    result = path.substring(index + splitPoint.length);
  }
  return result;
}
