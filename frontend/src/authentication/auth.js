import axios from "axios";

export const signup = async ({ email, username }, history) => {
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

    history("/verify-email");
  } catch (error) {
    console.log(error);
  }
};

export const signin = async ({ email, password }, history) => {
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
  } catch (error) {
    console.log(error);
  }
};
