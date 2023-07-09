const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default {
  baseUrl,
  login: baseUrl + "/api/business/signin",
  register: baseUrl + "/api/business/signup",
  logout: baseUrl + "/api/business/logout",
  profile: baseUrl + "/api/business/profile",
  forgotPassword: baseUrl + "/api/business/forgot-password",
  resetPassword: baseUrl + "/api/business/reset-password",
  validatePassToken: baseUrl + "/api/business/validate-password-reset-token",

  topics: baseUrl + "/api/faq-documents",
  chats: baseUrl + "/api/chats",
};
