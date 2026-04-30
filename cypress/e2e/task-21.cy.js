import GaragePage from "../support/pageObjects/GaragePage";
import ExpensesPage from "../support/pageObjects/ExpensesPage";

describe("Garage & Expenses flow - Config driven", () => {
  const garagePage = new GaragePage();
  const expensesPage = new ExpensesPage();

  let users;

  beforeEach(function () {
  cy.fixture('users').then((data) => {
    this.users = data;
  });
  });

  it("Step 1 - QAuto1 user", function () {
    const data = this.users.qauto1;

    cy.visit(data.url);
    cy.login(data.user.email, data.user.password);

    cy.get("body").type("{esc}");

    garagePage.open();
    garagePage.addCar(data.car).then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201, 400])
    })

    cy.get('app-add-car-modal, ngb-modal-window').should('not.exist');

    expensesPage.open();
    expensesPage.addExpense(data.expense);

    cy.contains(data.expense.liters).should("be.visible");
    cy.contains(data.expense.cost).should("be.visible");
  });

  it("Step 2 - QAuto2 user", function () {
    const data = this.users.qauto2;

    cy.visit(data.url);
    cy.login(data.user.email, data.user.password);

    cy.get("body").type("{esc}");

    garagePage.open();
    garagePage.addCar(data.car).then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201, 400]);
      cy.wrap(interception.response.body.data.id).as('carId');
    });

    expensesPage.open();
    expensesPage.addExpense(data.expense);

    cy.contains(data.expense.liters).should("be.visible");
    cy.contains(data.expense.cost).should("be.visible");

  });
});