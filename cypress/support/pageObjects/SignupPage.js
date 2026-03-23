class SignupPage {
  openSignup() {
    cy.contains('Sign In', { timeout: 10000 }).should('be.visible').click()

    cy.get('ngb-modal-window', { timeout: 10000 }).should('be.visible')

    cy.get('ngb-modal-window')
      .find('.modal-footer > .btn-link')
      .should('be.visible')
      .click()

    cy.get('ngb-modal-window', { timeout: 10000 }).should('be.visible')
  }

  nameInput() {
    return cy.get('[name="name"]')
  }

  lastNameInput() {
    return cy.get('[name="lastName"]')
  }

  emailInput() {
    return cy.get('[name="email"]')
  }

  passwordInput() {
    return cy.get('[name="password"]')
  }

  repeatPasswordInput() {
    return cy.get('#signupRepeatPassword')
  }

//   blurOutside() {
    // cy.get('ngb-modal-window').click('topLeft')
//   }

  errors = {
    nameRequired: () => cy.contains('Name required'),
    nameInvalid: () => cy.contains('Name is invalid'),
    nameLength: () => cy.contains('Name has to be from 2 to 20 characters long'),

    lastNameRequired: () => cy.contains('Last name required'),
    lastNameInvalid: () => cy.contains('Last name is invalid'),
    lastNameLength: () => cy.contains('Last name has to be from 2 to 20 characters long'),

    emailRequired: () => cy.contains('Email required'),
    emailInvalid: () => cy.contains('Email is incorrect'),

    passwordRequired: () => cy.contains('Password required'),
    passwordInvalid: () => cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'),

    repeatPasswordRequired: () => cy.contains('Re-enter password required', { timeout: 5000 }).should('be.visible'),
        // cy.contains('Re-enter password required'),
    passwordMismatch: () => cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'),
  }

  fillForm(user) {
    this.nameInput().clear().type(user.name)
    this.lastNameInput().clear().type(user.lastName)
    this.emailInput().clear().type(user.email)
    this.passwordInput().clear().type(user.password, { sensitive: true })
    this.repeatPasswordInput().clear().type(user.password, { sensitive: true })
  }

  submit() {
    cy.get('ngb-modal-window', { timeout: 10000 }).should('be.visible')
    cy.get('ngb-modal-window')
      .contains('button', 'Register')
      .should('be.visible')
      .should('not.be.disabled')
      .click()
  }
}

export default SignupPage