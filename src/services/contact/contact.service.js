import axios from "axios";
const sendContactData = async (formData) => {
  try {
    const res = await axios.post("http://127.0.0.1:3001/contact", formData);
    if (!res.status === 200) return false;
    return true;
  } catch (error) {
    return false;
  }
};

export default sendContactData;
