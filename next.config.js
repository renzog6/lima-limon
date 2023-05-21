/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },

  output: "standalone",

  i18n: {
    locales: ["es-AR", "en-US"],
    defaultLocale: "es-AR",
  },

  env: {
    apiUrl: "http://192.168.66.81:3000/api", // Cambia esto con tu URL de API real
  },

  httpAgentOptions: {
    keepAlive: false,
  },
};

module.exports = nextConfig;
