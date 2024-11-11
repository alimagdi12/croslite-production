import axios from "axios";
const sendContactData = async (formData) => {
  try {
    const res = await axios.post("https://api.croslite.com.eg:3001//contact", formData);
    if (!res.status === 200) return false;
    return true;
  } catch (error) {
    return false;
  }
};

export default sendContactData;
