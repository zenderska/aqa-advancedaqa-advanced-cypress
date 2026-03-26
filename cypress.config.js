const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // можеш додати node events тут, якщо потрібно
      return config;
    },
    baseUrl: "/", // базовий URL можна залишити пустим, бо у нас різні домени
  },
  env: {
    usersFile: "users.json"
  }
});