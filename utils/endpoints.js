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
  generateUserContext:
    baseUrl + "/api/faq-documents/{_id}/generate-user-context",
  blogs: baseUrl + "/api/dynamic-pages",
  chats: baseUrl + "/api/chats",
  chatbots: baseUrl + "/api/chatbots",
  chatbotByDomain: baseUrl + "/api/get-chatbot/by-domain",

  infinAIChatSdk: `${baseUrl}/assets/sdk/infinai-chat-sdk-v0.9.0.js`,
};
