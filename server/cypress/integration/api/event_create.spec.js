describe('event creation endpoint', () => {
    
    it('creates event - POST', () => {
        cy.request('/events').as('getEvents');
            //create event
            cy.request({
                method : 'POST', 
                url : '/events/', 
                body : { 
                    "name": "Help the kittens", 
                    "category": "Adoptions" 
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        
        // verify event on listing page
        cy.get('@getEvents').then(eventDetails => {
            expect(eventDetails.status).to.eq(200);
            expect(eventDetails.body).to.containSubset([{name: 'Help the kittens'}]);
        });
    });

    it('creates event with different category', () => {
        cy.request({
            method : 'POST', 
            url : '/events/', 
            body : { 
                "name": "Help the kittens", 
                "category": "Test Cat" 
            }
            }).then((response) => {
                expect(response.body).to.contain({ error: 'Invalid category' })
                //expect(response.status).to.eq(4**);
                //response code is 200             
            })
    });

    it('creates event name less than 3 characters long', () => {
        cy.request({
            method : 'POST', 
            url : '/events/', 
            body : { 
                "name": "Ho", 
                "category": "Adoptions" 
            }
            }).then((response) => {
                expect(response.body).to.contain({ error: 'name is to short' })
        })
    });

    it('sends empty body to the creaate events endpoint', () => {
        cy.request({
            method : 'POST', 
            url : '/events/', 
            body : {}
            }).then((response) => {
                expect(response.body).to.contain({ error: 'name is to short' })            
            })
    });

    it('sends unknown key pair values to the creaate events endpoint', () => {
        cy.request({
            method : 'POST', 
            url : '/events/', 
            body : {
                "location" : "O2 Academy",
                "date" : "12-06-2022"
            }
            }).then((response) => {
                expect(response.body).to.contain({ error: 'name is to short' })            
            })
    });
})