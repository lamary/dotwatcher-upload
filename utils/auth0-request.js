import axios from "axios";

const baseURL = process.env.GITHUB_REDIRECT_URL || `https://${process.env.VERCEL_URL}`;

export default async () => {
  const { data } = await axios({ method: "get", url: baseURL + "/api/auth0/token" });

  const { access_token } = data;

  return await axios.create({
    baseURL: process.env.AUTH0_API_URL,
    timeout: 1000,
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
