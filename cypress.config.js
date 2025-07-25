const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.laboratoriodetesting.com/',
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
  },
  viewportWidth: 1280,
  viewportHeight: 800,
  }
});
