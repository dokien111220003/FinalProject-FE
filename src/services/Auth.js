import axios from "axios";

const AuthService = {
  googleAuth: async (token) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/auth/google-auth`,
      { token }
    );

    return response.data;
  },
};

export default AuthService;
