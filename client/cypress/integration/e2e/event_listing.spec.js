describe('event listing page', () => {

    beforeEach(() => {
        cy.visit('/')
      })

    it('verifies nav bar menu items', () => {
        cy.contains('a', 'Home')
          .should('have.attr', 'href', '/')

        cy.get('a:contains("About")')
          .click()
        cy.url().should('include', '/about')
        cy.get('h1').should('have.text', 'About Animal Rescue League')
    })

    it.skip('verifies nav bar menu items in smaller resolution', () => {
        cy.viewport(890, 690)

        cy.get('.navbar-burger').click()
        //cannot click menu bar in smaller resolutions
        //assert menu items drop down after bug fix
    })

    it.skip('verifies sign up link works', () => {
        cy.get('.button-block').click()
        
        cy.get('.login h1').should('have.text', 'Welcome')
        cy.url().should('include', '/signup')
        //redirects to /login atm
    })


    it.skip('verifies sign-in is required before viewing event details', () => {
        cy.get('.column a')
          .then(link => {
        cy.request(link.prop('href'))
           .its('body')
           .should('include', '');
        })
        // 404 not found - nginx 
        //assert login prompt
    })


    it('verifies url redirection to event details page after sign-in', () => {
        cy.get('.column').first().click()

        cy.origin(
            "https://tropee-interview.eu.auth0.com/", () => {
              cy.get('#username').type(Cypress.env("userName"));
              cy.get('#password').type(Cypress.env("password"));
              cy.get('button[name="action"]').click();
        });     
        cy.url().should('include', '/event/1')
    })

    //intercept /event endpoint with empty array
    it('verifies empty event details', () => {
        cy.intercept('GET', '**/events', {body: []})
        cy.visit('/')
        cy.get('.events').should('not.have.class', 'event-card')
    })
})
  