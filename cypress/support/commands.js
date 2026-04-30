// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false

    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})

Cypress.Commands.add('login', (email, password) => {
  cy.contains('Sign In').click()
  cy.get('#signinEmail').type(email)
  cy.get('#signinPassword').type(password, { sensitive: true })
  cy.contains('Login').click()
  cy.url().then((url) => {
    if (!url.includes('/panel')) {
      cy.contains('Garage', { timeout: 10000 }).should('be.visible')
    }
  })
})

Cypress.Commands.add('closeModalIfPresent', () => {
  cy.get('body').then(($body) => {
    if ($body.find('ngb-modal-window').length) {
      cy.get('ngb-modal-window').within(() => {
        cy.contains('button', 'Close').click({ force: true })
      })
    }
  })
})

Cypress.Commands.add('createExpenseAPI', (expense) => {
  return cy.get('@carId').then((carId) => {
    return cy.request({
      method: 'POST',
      url: 'https://guest:welcome2qauto@qauto.forstudy.space/api/expenses',
      body: {
        carId,
        mileage: Number(expense.mileage),
        liters: Number(expense.liters),
        totalCost: Number(expense.cost),
        reportedAt: new Date().toISOString(),
      },
    });
  });
});