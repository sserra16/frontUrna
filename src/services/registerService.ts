import api from "./api";
import aluno from "../models/aluno";

class RegisterService {
  create(data: aluno) {
    return api.post("/register", data);
  }

  setToken = (token: string) => {
    if (token) {
      localStorage.setItem("accessToken", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      this.removeToken();
    }
  };

  removeToken = () => {
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common.Authorization;
  };
}

const registerService = new RegisterService();

export default registerService;
