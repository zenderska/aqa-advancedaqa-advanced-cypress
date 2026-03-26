const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space/',

    setupNodeEvents(on, config) {
      return config
    },

    env: {
      user: {
        name: 'Donny',
        lastName: 'Gover',
        email: 'kebobec175@izkat.com',
        password: 'Password456',
      }
    },

    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/qauto2',
      overwrite: false,
      html: true,
      json: true,
    }
  }
})