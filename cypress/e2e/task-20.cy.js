import SignupPage from '../support/pageObjects/SignupPage'

describe('Registration', () => {
  const signupPage = new SignupPage()

  const validUser = {
    name: 'John',
    lastName: 'Doe',
    email: 'geresat765@paylaar.com',
    password: 'Password123',
  }

  const generateUser = () => ({
    name: 'John',
    lastName: 'Doe',
    email: `aqa_${Date.now()}@test.com`,
    password: 'Password123',
  })

  Cypress.Commands.add('login', (email, password) => {
    cy.contains('Sign In').click()
    cy.get('#signinEmail').type(email)
    cy.get('#signinPassword').type(password, { sensitive: true })
    cy.contains('Login').click()
    cy.url().should('include', '/panel')
  })

  const registerOrLogin = (user) => {
    cy.intercept('POST', '/api/auth/signup').as('signup')
    signupPage.fillForm(user)
    signupPage.submit()
    cy.wait('@signup').then(({ response }) => {
      if (response.statusCode === 201) {
        cy.url().should('include', '/panel')
      }
      if (response.statusCode === 400) {
        cy.get('.close > span').should('be.visible').click()
        cy.login(user.email, user.password)
      }
    })
  }

  beforeEach(() => {
    cy.visit('/')
  })

  it('Should register or login if user already exists', () => {
    cy.visit('/')
    signupPage.openSignup()
    registerOrLogin(validUser)
  })

  it('Should register successfully with dynamic email', () => {
    cy.visit('/')
    signupPage.openSignup()
    const user = generateUser()
    registerOrLogin(user)
  })

  context('Registration Modal - Negative tests', () => {

    const openRegistrationModalViaSignIn = () => {
      cy.contains('Sign In').click({ force: true })

      cy.get('ngb-modal-window:visible').last().within(() => {
        cy.contains('Registration').click()
      })

      cy.get('ngb-modal-window:visible').last().within(() => {
        signupPage.nameInput().should('be.visible')
      })
    }

    const closeRegistrationModal = () => {
      cy.get('ngb-modal-window:visible').last().within(() => {
        cy.get('.close > span').click({ force: true })
      })
    }

    it('Should show errors for empty fields', () => {
      openRegistrationModalViaSignIn()

      cy.get('ngb-modal-window:visible').last().within(() => {
        signupPage.nameInput().click()
        signupPage.lastNameInput().click()
        signupPage.emailInput().click()
        signupPage.passwordInput().click()
        signupPage.repeatPasswordInput().click()

        signupPage.errors.nameRequired().should('be.visible')
        signupPage.errors.lastNameRequired().should('be.visible')
        signupPage.errors.emailRequired().should('be.visible')
        signupPage.errors.passwordRequired().should('be.visible')
        signupPage.errors.repeatPasswordRequired().should('be.visible')
        signupPage.errors.passwordMismatch().should('be.visible')
      })

      closeRegistrationModal()
    })

    it('Should validate Name field', () => {
      openRegistrationModalViaSignIn()

      cy.get('ngb-modal-window:visible').last().within(() => {
        signupPage.nameInput().click()
        signupPage.lastNameInput().click()
        signupPage.errors.nameRequired().should('be.visible')

        signupPage.nameInput().clear().type('1')
        signupPage.lastNameInput().click()
        signupPage.errors.nameInvalid().should('be.visible')

        signupPage.nameInput().clear().type('A')
        signupPage.lastNameInput().click()
        signupPage.errors.nameLength().should('be.visible')
      })

      closeRegistrationModal()
    })

    it('Should validate Last Name field', () => {
      openRegistrationModalViaSignIn()

      cy.get('ngb-modal-window:visible').last().within(() => {
        signupPage.lastNameInput().click()
        signupPage.nameInput().click()
        signupPage.errors.lastNameRequired().should('be.visible')

        signupPage.lastNameInput().clear().type('1')
        signupPage.nameInput().click()
        signupPage.errors.lastNameInvalid().should('be.visible')

        signupPage.lastNameInput().clear().type('A')
        signupPage.nameInput().click()
        signupPage.errors.lastNameLength().should('be.visible')
      })

      closeRegistrationModal()
    })

    it('Should validate Email field', () => {
      openRegistrationModalViaSignIn()

      cy.get('ngb-modal-window:visible').last().within(() => {
        signupPage.emailInput().click()
        signupPage.passwordInput().click()
        signupPage.errors.emailRequired().should('be.visible')

        signupPage.emailInput().clear().type('wrongemail')
        signupPage.passwordInput().click()
        signupPage.errors.emailInvalid().should('be.visible')
      })

      closeRegistrationModal()
    })

    it('Should validate Password field', () => {
      openRegistrationModalViaSignIn()

      cy.get('ngb-modal-window:visible').last().within(() => {
        signupPage.passwordInput().click()
        signupPage.repeatPasswordInput().click()
        signupPage.errors.passwordRequired().should('be.visible')

        signupPage.passwordInput().clear().type('123', { sensitive: true })
        signupPage.repeatPasswordInput().click()
        signupPage.errors.passwordInvalid().should('be.visible')

        signupPage.passwordInput().clear().type('password', { sensitive: true })
        signupPage.repeatPasswordInput().click()
        signupPage.errors.passwordInvalid().should('be.visible')
      })

      closeRegistrationModal()
    })

    it('Should validate Repeat Password field as required', () => {
  openRegistrationModalViaSignIn()

  cy.get('ngb-modal-window:visible').last().within(() => {
    signupPage.repeatPasswordInput()
      .type('word3', { sensitive: true })
      .clear()

    signupPage.passwordInput().click()

    cy.get('.invalid-feedback')
      .should('be.visible')
      .and('contain', 'Re-enter password required')
  })

  closeRegistrationModal()
})
  it('Should validate Repeat Password field for mismatch', () => {
  openRegistrationModalViaSignIn()

  cy.get('ngb-modal-window:visible').last().within(() => {
    signupPage.passwordInput()
      .type('Password123', { sensitive: true })

    signupPage.repeatPasswordInput()
      .type('word3', { sensitive: true })

    signupPage.passwordInput().click()

    signupPage.errors.passwordMismatch()
      .should('be.visible')
  })

  closeRegistrationModal()
})

  })
})