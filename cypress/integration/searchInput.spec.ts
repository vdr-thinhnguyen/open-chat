describe("SearchInput component", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("ROOT_URL"));
  });

  it("displays Send a message", () => {
    cy.contains("Send a message").should("be.visible");
  });
});
