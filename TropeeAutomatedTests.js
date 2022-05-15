afterEach(() => {
    cy.wait(1000)
})
  
describe('Test Case 01 - Tropee Client Frontend Tests', function(){

    it('Step 01 - Verify Welcome Message', function(){

        cy.visit('localhost:8080/')
        cy.contains('Welcome to the Animal Rescue League')
    })

    
    it(' Step 02 - Verify that the users can click on the "Sign in" button', function(){

        cy.contains('Sign in').click({force: true})
        cy.contains('Email address')
    })

    it('Step 03 - Verify that the users can not sign in with an invalid Login Id', function(){

        cy.get('#username').type('TestInvalidUser')
        cy.get('#password').type('TestInvalidPasswd')

        cy.contains('Continue').click({force: true})
        cy.contains('Wrong email or password')
    })

    it('Step 04 - Verify that the users can sign in with a valid Login Id', function(){

        cy.get('#username').clear()
        cy.get('#password').clear()

        cy.get('#username').type('delarosa62@hotmail.com')
        cy.get('#password').type('Tropee@')

        cy.contains('Continue').click({force: true})

        cy.contains('Welcome!')
        cy.contains('delarosa62@hotmail.com!')
    })

    it('Step 05 - Verify that the users can access the Charity Ball Event', function(){

        cy.get('a[href*="/event/1"]').click()

    })
})

describe('Test Case 02 - Tropee Client Frontend Multiple Sign In attempts', function(){

    it('Step 01 - Verify that the users accounts are blocked after multiple unsuccessful sign in attempts', function() {

        cy.readFile('JAVASCRIPT.txt').then((content) => {

            for(let i=0;i<10; i++) {
                
                cy.get('#username').clear()
                cy.get('#password').clear()
                cy.wait(200)

                cy.get('#username').type('delarosa62@hotmail.com')
                cy.get('#password').type('Tropee@')
                cy.wait(200)

                cy.contains('Continue').click({force: true})
                cy.wait(200)
            }

        cy.contains('Your account has been blocked after multiple consecutive login attempts')

        })

    })
})

describe('Test Case 03 - Tropee Server Listening Status Frontend Tests', function(){

    it('Step 01 - Verify the server is listening on Port 8000', function(){

        cy.visit('localhost:8000/')
        cy.contains('Hi! Server is listening on port 8000')
    })

})


describe('Test Case 04 - Tropee Server Events Backend Tests', function(){

    it('Step 01 - Verify that an event with a naming convention that is more than three characters long, and belongs to one of these two categories: Adoptions or Fundraising,  can be registered(POST) in the Backend server', function(){

        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/events',
            body: {
                name: "MoreThen3CharsLong",
                category: "Adoptions"           
            },
        }).then( (response) => { 

            expect(response.status).to.eq(200)

        } )

    })
    
    it('Step 02 - Verify that the event registered in the previous step is actually registered(GET) in the Backend server', function(){

        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/events',
            body: {
                name: "MoreThen3CharsLong",
                category: "Adoptions"           
            },
        }).then( (response) => { 

            expect(response.body[response.body.length-1].name).to.contain('MoreThen3CharsLong')

        } )

    })

    it('Step 03 - Verify that an event with a naming convention that has three characters ONLY, and belongs to one of these 2 categories "Adoptions" or "Fundraising",  can be registered(POST) in the Backend server', function(){

        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/events',
            body: {
                name: "abc",
                category: "Fundraising"           
            },
        }).then( (response) => { 

            expect(response.status).to.eq(200)

        } )

    })

    it('Step 04 - Verify that the event registered in the previous step is actually registered(GET) in the Backend server', function(){

        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/events',
            body: {
                name: "abc",
                category: "Fundraising"           
            },
        }).then( (response) => { 

            expect(response.body[response.body.length-1].name).to.contain('abc')

        } )

    })

    it('Step 05 - Verify that an event with a naming convention that has less than three characters, and belongs to one of these 2 categories "Adoptions" or "Fundraising", won´t be registered(POST) in the Backend server and but it will return an Ok response', function(){

        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/events',
            body: {
                name: "cr",
                category: "Fundraising"           
            },
        }).then( (response) => { 

            expect(response.status).to.eq(200)

        } )

    })

    it('Step 06 - Verify that the event registered in the previous step is NOT registered(GET) in the Backend server', function(){

        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/events',
            body: {
                name: "cr",
                category: "Fundraising"           
            },
        }).then( (response) => { 

            expect(response.body[response.body.length-1].name).not.to.contain('cr')

        } )

    })

    it('Step 07 - Verify that an event with a category different than Adoptions and Fundraising won´t be registered(POST) in the backend server BUT it will return an Ok Response', function(){

        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/events',
            body: {
                name: "InvCat",
                category: "InvalidCategory"           
            },
        }).then( (response) => { 

            expect(response.status).to.eq(200)

        } )

    })

    it('Step 08 - Verify that the event registered in the previous step is NOT registered(GET) in the Backend server', function(){

        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/events',
            body: {
                name: "InvCat",
                category: "InvalidCategory"           
            },
        }).then( (response) => { 

            expect(response.body[response.body.length-1].name).not.to.contain('InvCat')

        } )

    })
    
})
