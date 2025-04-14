import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  kiuUser: process.env.KIU_USER!,
  kiuPassword: process.env.KIU_PASSWORD!,
  kiuApiUrl: process.env.KIU_API_URL!,
};
