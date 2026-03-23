class SignupPage {

  registrationModal() {
    return cy.contains('ngb-modal-window', 'Registration')
  }

  openSignup() {
    cy.contains('Sign In').click()

    cy.get('ngb-modal-window').should('be.visible')

    cy.get('ngb-modal-window')
      .find('.modal-footer > .btn-link')
      .click()

    this.registrationModal().should('be.visible')
  }

  openRegistrationViaSignIn() {
    cy.contains('Sign In').click({ force: true })

    cy.get('ngb-modal-window').should('be.visible')

    cy.get('ngb-modal-window')
      .contains('Registration')
      .click()

    this.registrationModal().should('be.visible')
  }

  closeModal() {
    this.registrationModal()
      .find('.close > span')
      .click({ force: true })
  }

  nameInput() {
    return this.registrationModal().find('[name="name"]')
  }

  lastNameInput() {
    return this.registrationModal().find('[name="lastName"]')
  }

  emailInput() {
    return this.registrationModal().find('[name="email"]')
  }

  passwordInput() {
    return this.registrationModal().find('[name="password"]')
  }

  repeatPasswordInput() {
    return this.registrationModal().find('#signupRepeatPassword')
  }

  fillForm(user) {
    this.nameInput().clear().type(user.name)
    this.lastNameInput().clear().type(user.lastName)
    this.emailInput().clear().type(user.email)
    this.passwordInput().clear().type(user.password, { sensitive: true })
    this.repeatPasswordInput().clear().type(user.password, { sensitive: true })
  }

  submit() {
    this.registrationModal()
      .contains('button', 'Register')
      .should('be.visible')
      .and('not.be.disabled')
      .click()
  }

  triggerNameRequired() {
    this.nameInput().click()
    this.lastNameInput().click()
  }

  triggerNameInvalid() {
    this.nameInput().clear().type('1')
    this.lastNameInput().click()
  }

  triggerNameTooShort() {
    this.nameInput().clear().type('A')
    this.lastNameInput().click()
  }

  triggerLastNameRequired() {
    this.lastNameInput().click()
    this.nameInput().click()
  }

  triggerLastNameInvalid() {
    this.lastNameInput().clear().type('1')
    this.nameInput().click()
  }

  triggerLastNameTooShort() {
    this.lastNameInput().clear().type('A')
    this.nameInput().click()
  }

  triggerEmailRequired() {
    this.emailInput().click()
    this.passwordInput().click()
  }

  triggerEmailInvalid() {
    this.emailInput().clear().type('wrongemail')
    this.passwordInput().click()
  }

  triggerPasswordRequired() {
    this.passwordInput().click()
    this.repeatPasswordInput().click()
  }

  triggerPasswordTooShort() {
    this.passwordInput().clear().type('123', { sensitive: true })
    this.repeatPasswordInput().click()
  }

  triggerPasswordWeak() {
    this.passwordInput().clear().type('password', { sensitive: true })
    this.repeatPasswordInput().click()
  }

  triggerRepeatPasswordRequired() {
    this.repeatPasswordInput().type('123').clear()
    this.passwordInput().click()
  }

  triggerPasswordMismatch() {
    this.passwordInput().type('Password123', { sensitive: true })
    this.repeatPasswordInput().type('wrong', { sensitive: true })
    this.passwordInput().click()
  }

  errors = {
    nameRequired: () => this.registrationModal().contains('Name required'),
    nameInvalid: () => this.registrationModal().contains('Name is invalid'),
    nameLength: () => this.registrationModal().contains('Name has to be from 2 to 20 characters long'),

    lastNameRequired: () => this.registrationModal().contains('Last name required'),
    lastNameInvalid: () => this.registrationModal().contains('Last name is invalid'),
    lastNameLength: () => this.registrationModal().contains('Last name has to be from 2 to 20 characters long'),

    emailRequired: () => this.registrationModal().contains('Email required'),
    emailInvalid: () => this.registrationModal().contains('Email is incorrect'),

    passwordRequired: () => this.registrationModal().contains('Password required'),
    passwordInvalid: () =>
      this.registrationModal().contains(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      ),

    repeatPasswordRequired: () =>
      this.registrationModal().contains('Re-enter password required'),

    passwordMismatch: () =>
      this.registrationModal().contains(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      ),
  }
}

export default SignupPage