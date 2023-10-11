const { i18n } = require("./next-i18next.config");

module.exports = {
  // Other configuration options...
  webpack: (config, options) => {
    if (!options.isServer) {
      config.cache = {
        type: "memory",
        // other options...
      };
    }

    return config;
  },
  i18n,
};
