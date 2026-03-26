const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space/',
    
    setupNodeEvents(on, config) {
      return config
    },

    env: {
      user: {
        name: 'John',
        lastName: 'Doe',
        email: 'geresat765@paylaar.com',
        password: 'Password123',
      }
    },

    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/qauto',
      overwrite: false,
      html: true,
      json: true,
    }
  }
})