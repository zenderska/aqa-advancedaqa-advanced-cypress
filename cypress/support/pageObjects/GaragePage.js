class GaragePage {
  open() {
    cy.contains('Garage').click()
    cy.get('app-add-car-modal').should('not.exist')
  }

  clickAddCar() {
    cy.contains('Add car').click()
  }

  selectBrand(brand) {
  cy.get('#addCarBrand')
    .select(brand)
    .find('option:selected')
    .should('have.text', brand)
  }

  selectModel(model) {
  cy.get('#addCarModel')
    .select(model)
    .find('option:selected')
    .should('have.text', model)
  }

  enterMileage(mileage) {
    cy.get('#addCarMileage').type(mileage)
  }

  submit() {
    cy.intercept('POST', '/api/cars').as('addCar')

    cy.get('app-add-car-modal').should('be.visible').within(() => {
      cy.contains('button', 'Add')
        .should('be.visible')
        .click()
    })

    return cy.wait('@addCar').then((interception) => {
      return cy.get('app-add-car-modal').then(($modal) => {
        if ($modal.length) {
          cy.wrap($modal.first()).within(() => {
            cy.contains('button', 'Cancel').click({ force: true })
          })
          cy.get('app-add-car-modal').should('not.exist')
        }
      }).then(() => interception)
    })
  }

  addCar({ brand, model, mileage }) {
  this.clickAddCar()
  this.selectBrand(brand)
  this.selectModel(model)
  this.enterMileage(mileage)
  return this.submit()
  }
}

export default GaragePage