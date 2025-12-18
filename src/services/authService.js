// 로그인/회원가입 API 요청 모듈
import api from "./api";

/* 로그인
 * POST /users/login
 * payload: { email, password }
 */
export const login = async (payload) => {
  try {
    const res = await api.post("/users/login", payload);
    return res.data; // success, message, data
  } catch (err) {
    throw err.response?.data || { message: "로그인 실패" };
  }
};

/* 회원가입
 * POST /users/signup
 * payload: { email, password, name, phoneNumber }
 */
export const signup = async (payload) => {
  try {
    const res = await api.post("/users/signup", payload);
    return res.data; // success, message, data(회원정보)
  } catch (err) {
    throw err.response?.data || { message: "회원가입 실패" };
  }
};
