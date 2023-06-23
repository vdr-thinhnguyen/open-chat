import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    OPEN_AI_API_KEY: "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",
    OPEN_AI_API_MODEL: "davinci",
    ROOT_URL: "http://localhost:3000",
  },
});
