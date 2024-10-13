import axios from "axios";

class SignupService {
  static async signup(userData) {
    try {
      const response = await axios.post("http://127.0.0.1:3000/signup", userData); // Added http://
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Signup failed!");
      } else if (error.request) {
        throw new Error("No response from server. Please try again later.");
      } else {
        throw new Error(error.message);
      }
    }
  }
}

export default SignupService;
