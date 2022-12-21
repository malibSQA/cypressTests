// import { defineConfig } from 'cypress'

// export default defineConfig({

const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  fixturesFolder: 'cypress/fixtures',
  env: {
    any: 'yes',
    db: {
      host: 'staging-vdotokdb.cvyddy98b4hq.eu-west-1.rds.amazonaws.com',
      user: 'aleem',
      password: 'Vr45!asMnk)9',
      database: 'vdotok_db_7',
    },
    updateSnapshots: false,
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'My Test Suite',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://qahost.togee.io',
  },
})
