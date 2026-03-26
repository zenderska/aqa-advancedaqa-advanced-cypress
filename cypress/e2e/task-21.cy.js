import GaragePage from "../support/pageObjects/GaragePage";
import ExpensesPage from "../support/pageObjects/ExpensesPage";

describe("Garage & Expenses flow - Config driven", () => {
  const garagePage = new GaragePage();
  const expensesPage = new ExpensesPage();

  let users;

  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  it("Step 1 - QAuto1 user", () => {
    const data = users.qauto1;

    cy.visit(data.url);
    cy.login(data.user.email, data.user.password);

    cy.get("body").type("{esc}");

    garagePage.open();
    garagePage.addCar(data.car);

    cy.get("ngb-modal-window").should("not.exist");

    expensesPage.open();
    expensesPage.addExpense(data.expense);

    cy.contains(data.expense.liters).should("be.visible");
    cy.contains(data.expense.cost).should("be.visible");
  });

  it("Step 2 - QAuto2 user", () => {
    const data = users.qauto2;

    cy.visit(data.url);
    cy.login(data.user.email, data.user.password);

    cy.get("body").type("{esc}");

    garagePage.open();
    garagePage.addCar(data.car);

    expensesPage.open();
    expensesPage.addExpense(data.expense);

    cy.contains(data.expense.liters).should("be.visible");
    cy.contains(data.expense.cost).should("be.visible");
  });
});