class ExpensesPage {
  open() {
    cy.contains(/Fuel expenses|Expenses/).click();
    cy.get('ngb-modal-window').should('not.exist');
  }

  clickAddExpense() {
    cy.contains('Add an expense').click();
  }

  enterMileage(mileage) {
    cy.get('#addExpenseMileage')
      .should('be.visible')
      .clear()
      .type(mileage)
  }

  enterLiters(liters) {
    cy.get('#addExpenseLiters').clear().type(liters)
  }

  enterTotalCost(cost) {
    cy.get('#addExpenseTotalCost').clear().type(cost)
  }

  submit() {
    cy.intercept('POST', '/api/expenses').as('addExpense')

    cy.get('ngb-modal-window').should('be.visible').within(() => {
      cy.contains('button', 'Add').click()
    })

    return cy.wait('@addExpense')
  }

  addExpense({ mileage, liters, cost }) {
    this.clickAddExpense()
    this.enterMileage(mileage)
    this.enterLiters(liters)
    this.enterTotalCost(cost)
    this.submit()
  }
}

export default ExpensesPage