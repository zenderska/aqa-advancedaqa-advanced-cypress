class LoginPage {

  open() {
    cy.visit('/')
  }

  login(email, password) {
    cy.contains('Sign In').click()

    cy.get('#signinEmail').type(email)
    cy.get('#signinPassword').type(password, { sensitive: true })

    cy.contains('Login').click()

    cy.url().should('include', '/panel')
  }
}

export default LoginPage