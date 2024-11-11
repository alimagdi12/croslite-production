import axios from "axios";

const LoginService = async (formData) => {
  try {
    const res = await axios.post("https://api.croslite.com.eg:3001//login", formData);

    if (res.status === 200) {
      localStorage.setItem("token", res.data.token); // Assuming the token is sent in the response body as { token: '...' }
      return true;
    }

    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

export default LoginService;
