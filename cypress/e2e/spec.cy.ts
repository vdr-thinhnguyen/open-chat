describe("Visit page", () => {
  it("passes", () => {
    cy.visit(Cypress.env("ROOT_URL"));
  });
});
