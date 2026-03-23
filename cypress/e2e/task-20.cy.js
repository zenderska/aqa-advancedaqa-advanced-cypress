import SignupPage from '../support/pageObjects/SignupPage'

describe('Registration & Authorization', () => {
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
        signupPage.closeModal()
        cy.login(user.email, user.password)
      }
    })
  }

  beforeEach(() => {
    cy.visit('/')
  })


  it('Should register or login if user already exists', () => {
    signupPage.openSignup()
    registerOrLogin(validUser)
  })

  it('Should register successfully with dynamic email', () => {
    signupPage.openSignup()
    registerOrLogin(generateUser())
  })


  context('Registration Modal - Validation tests', () => {

    beforeEach(() => {
      signupPage.openRegistrationViaSignIn()
    })

    afterEach(() => {
      signupPage.closeModal()
    })


    it('Name - required', () => {
      signupPage.triggerNameRequired()
      signupPage.errors.nameRequired().should('be.visible')
    })

    it('Name - invalid characters', () => {
      signupPage.triggerNameInvalid()
      signupPage.errors.nameInvalid().should('be.visible')
    })

    it('Name - too short', () => {
      signupPage.triggerNameTooShort()
      signupPage.errors.nameLength().should('be.visible')
    })


    it('Last Name - required', () => {
      signupPage.triggerLastNameRequired()
      signupPage.errors.lastNameRequired().should('be.visible')
    })

    it('Last Name - invalid characters', () => {
      signupPage.triggerLastNameInvalid()
      signupPage.errors.lastNameInvalid().should('be.visible')
    })

    it('Last Name - too short', () => {
      signupPage.triggerLastNameTooShort()
      signupPage.errors.lastNameLength().should('be.visible')
    })



    it('Email - required', () => {
      signupPage.triggerEmailRequired()
      signupPage.errors.emailRequired().should('be.visible')
    })

    it('Email - invalid format', () => {
      signupPage.triggerEmailInvalid()
      signupPage.errors.emailInvalid().should('be.visible')
    })

    
    it('Password - required', () => {
      signupPage.triggerPasswordRequired()
      signupPage.errors.passwordRequired().should('be.visible')
    })

    it('Password - invalid (too short)', () => {
      signupPage.triggerPasswordTooShort()
      signupPage.errors.passwordInvalid().should('be.visible')
    })

    it('Password - invalid (weak)', () => {
      signupPage.triggerPasswordWeak()
      signupPage.errors.passwordInvalid().should('be.visible')
    })

    
    it('Repeat Password - required', () => {
      signupPage.triggerRepeatPasswordRequired()
      signupPage.errors.repeatPasswordRequired().should('be.visible')
    })

    it('Repeat Password - mismatch', () => {
      signupPage.triggerPasswordMismatch()
      signupPage.errors.passwordMismatch().should('be.visible')
    })
  })
})