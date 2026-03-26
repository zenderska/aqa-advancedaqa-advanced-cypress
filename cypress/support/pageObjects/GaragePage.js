class GaragePage {
  open() {
    cy.contains('Garage').click()
    cy.get('ngb-modal-window').should('not.exist')
  }

  clickAddCar() {
    cy.contains('Add car').click()
  }

  selectBrand(brand) {
    cy.get('#addCarBrand').select(brand)
  }

  selectModel(model) {
    cy.get('#addCarModel').select(model)
  }

  enterMileage(mileage) {
    cy.get('#addCarMileage').type(mileage)
  }

  submit() {
  cy.intercept('POST', '/api/cars').as('addCar')

  cy.get('ngb-modal-window').should('be.visible').within(() => {
    cy.contains('button', 'Add')
      .should('be.visible')
      .click()
  })

  cy.wait('@addCar').its('response.statusCode').should('eq', 201)

  cy.get('body').then(($body) => {
    if ($body.find('ngb-modal-window').length) {
      cy.contains('button', 'Cancel').click({ force: true })
    }
  })

  cy.get('ngb-modal-window').should('not.exist')
}

  addCar({ brand, model, mileage }) {
    this.clickAddCar()
    this.selectBrand(brand)
    this.selectModel(model)
    this.enterMileage(mileage)
    this.submit()
  }
}

export default GaragePage