import axios from "axios";
export const register = async ({ email, username }, history) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8800/api/auth/register",
      { email, username },
      config
    );
    history("/welcome-screen");
    return data;
  } catch (error) {
    return error;
  }
};

export const login = async ({ email, password }, history) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8800/api/auth/login",
      { email, password },
      config
    );

    localStorage.setItem("userData", JSON.stringify(data));

    history("/dashboard");
    return data;
  } catch (error) {
    return error;
  }
};
