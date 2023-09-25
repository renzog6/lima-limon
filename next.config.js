//@next.config.js
/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },

  i18n: {
    locales: ["es-AR", "en-US"],
    defaultLocale: "es-AR",
  },

  env: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? process.env.URL_API_DEV // development api
        : process.env.URL_API_PROD, // production api
  },
};

module.exports = nextConfig;
