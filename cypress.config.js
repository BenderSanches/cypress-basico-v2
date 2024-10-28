const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
//"cy:open:mobile": "cypress open --config viewportWidth=410 viewportHeight=860", 
//"test:mobile": "cypress run --config viewportWidth=410 viewportHeight=860", "