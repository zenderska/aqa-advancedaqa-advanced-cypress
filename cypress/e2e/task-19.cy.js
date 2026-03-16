describe('Header and Footer elements verification', () => {

  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  });

  it('Check header buttons', () => {
    cy.get('header').within(() => {

      cy.contains('Home').should('be.visible');
      cy.contains('About').should('be.visible');
      cy.contains('Contacts').should('be.visible');
      cy.contains('Guest log in').should('be.visible');
      cy.contains('Sign In').should('be.visible');

    });
  });

  it('Check footer social links', () => {
    cy.get('#contactsSection').should('exist').within(() => {

      cy.get('a[href*="facebook"]').should('exist');
      cy.get('a[href*="t.me"]').should('exist');
      cy.get('a[href*="youtube"]').should('exist');
      cy.get('a[href*="instagram"]').should('exist');
      cy.get('a[href*="linkedin"]').should('exist');

    });
  });

});