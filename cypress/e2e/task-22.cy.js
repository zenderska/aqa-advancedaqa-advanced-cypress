import GaragePage from "../support/pageObjects/GaragePage";
import ExpensesPage from "../support/pageObjects/ExpensesPage";

describe("Hybrid UI + API flow", () => {
  const today = new Date().toISOString();
  const garagePage = new GaragePage();
  const expensesPage = new ExpensesPage();

  const car = {
    brand: "Audi",
    model: "A6",
    mileage: "120",
  };

  const expense = {
    mileage: "130",
    liters: "20",
    cost: "500",
  };

  beforeEach(() => {
    cy.visit("https://guest:welcome2qauto@qauto.forstudy.space/");
    cy.login("geresat765@paylaar.com", "Password123");
    cy.get("body").type("{esc}");
  });

  it("Full flow with intercept + API + UI validation", () => {
    cy.intercept("POST", "**/api/cars").as("createCar");

    garagePage.open();
    garagePage.addCar(car).then((interception) => {
    expect(interception.response.statusCode).to.be.oneOf([200, 201, 400])

    const carId = interception.response.body.data.id
    cy.wrap(carId).as("carId")
    })

    // cy.wait("@createCar").then((interception) => {
      // expect(interception.response.statusCode).to.eq(400);

      // const carId = interception.response.body.data.id;
      // cy.wrap(carId).as("carId");
    // });

    cy.get("@carId").then((carId) => {
      cy.request(
        "GET",
        "https://guest:welcome2qauto@qauto.forstudy.space/api/cars",
      ).then((res) => {
        expect(res.status).to.be.oneOf([200, 201]);

        const carFromList = res.body.data.find((c) => c.id === carId);

        expect(carFromList).to.exist;
        expect(carFromList.brand).to.eq(car.brand);
        expect(carFromList.model).to.eq(car.model);
        expect(carFromList.mileage).to.eq(Number(car.mileage));
      });
    });

    cy.createExpenseAPI(expense).then((res) => {
      expect(res.status).to.be.oneOf([200, 201]);

      expect(res.body.data).to.include({
        liters: Number(expense.liters),
        totalCost: Number(expense.cost),
      });
    });

    expensesPage.open();
    cy.reload();

    cy.get("table").should("contain", expense.liters);
    cy.get("table").should("contain", expense.cost);
  });
});
