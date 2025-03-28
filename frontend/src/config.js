const config = {
  API_URL:
    process.env.NODE_ENV === "production"
      ? "http://127.0.0.1:8000" // Production URL
      : "http://127.0.0.1:8000", // Development URL
};

export default config;
