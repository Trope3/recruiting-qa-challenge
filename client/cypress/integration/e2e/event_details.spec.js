describe('event details page', () => {
    beforeEach(() => {
      cy.login(Cypress.env("userName"), Cypress.env("password"));
      cy.visit('/')
    })
 
    it('verifies event title', () => {
      //get event details from listing page
      cy.get('.columns .card h2').eq(1).as('card-content')

      cy.get('@card-content').invoke('text')
        .then((text1) => {
          cy.get('@card-content').click()
          //verify event details on details page
          cy.get('.event-single .hero-body h1')
            .invoke('text')
            .should((text2) => {
            expect(text1).eq(text2)
          })
        })
    })

    it('verifies event details', () => {
      cy.get('.columns .card h2').eq(1).as('card-content')
      cy.get('@card-content').click()

      //date & time
      cy.get('.hero-body h2').should('have.class', 'subtitle')

      //image
      cy.get('[alt="Rescue Center Goods Drive"]')
        .should('be.visible')
        .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })

      //location & category
      cy.get('.event-content strong').eq(0).should('have.text', 'Location:')
      cy.get('.event-content strong').eq(1).should('have.text', 'Category:')
    })  
})
  