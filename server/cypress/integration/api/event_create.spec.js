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
            })
        
        // verify event on listing page
        cy.get('@getEvents').then(eventDetails => {
            expect(eventDetails.status).to.eq(200);
            expect(eventDetails.body).has.property("name", "Help the kittens");
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
})