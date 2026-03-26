const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    baseUrl: "/",
  },
  env: {
    usersFile: "users.json"
  }
});