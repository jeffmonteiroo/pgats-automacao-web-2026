const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 900,
  video: false,
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 90000,
  retries: 0,
  blockHosts: ['*.doubleclick.net', '*.googlesyndication.com', '*.googleadservices.com'],
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    reportFilename: 'relatorio',
    reportPageTitle: 'PGATS - Automation Exercise',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true
  },
  e2e: {
    baseUrl: 'https://automationexercise.com',
    testIsolation: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    }
  }
})
