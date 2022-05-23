Cypress.Commands.add('login', (username, password) => {
   cy.session([username, password], () => {
   cy.visit('/')
   cy.get('.button > strong').click()
   
   cy.origin(
     "https://tropee-interview.eu.auth0.com/",
    { args : [username, password]},
    ([username, password]) => {
       cy.get('#username').type(username);
       cy.get('#password').type(password);
       cy.get('button[name="action"]').click();
    });

    cy.get('.button-block').should('have.text', 'Welcome, ' + username + '!')

    })
})