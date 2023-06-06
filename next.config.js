/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },

  //output: "standalone",

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

  httpAgentOptions: {
    keepAlive: false,
  },
};

module.exports = nextConfig;
