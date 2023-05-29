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
        ? "http://192.168.88.91:3000/api" // development api
        : "http://192.168.88.80/api", // production api
    //apiUrl: "http://192.168.88.80/api",
    //apiUrl: "http://192.168.88.91:3000/api",
  },

  httpAgentOptions: {
    keepAlive: false,
  },
};

module.exports = nextConfig;
