/* eslint-disable no-undef */
describe('Order Form', () => {
    beforeEach(() => {
      // Visit the form page
      cy.visit('http://localhost:5173/siparisFormu'); // Adjust the URL as needed
    });
  
    it('should allow text input for fullname', () => {
      cy.get('input[name="fullname"]').type('Ömer Bayram');
      cy.get('input[name="fullname"]').should('have.value', 'Ömer Bayram');
    });
  
    it('should allow multiple ingredients to be selected', () => {
      // Select multiple ingredients
      cy.get('input[name="ekMalzeme"][value="pepperoni"]').check();
      cy.get('input[name="ekMalzeme"][value="domates"]').check();
      cy.get('input[name="ekMalzeme"][value="biber"]').check();
      cy.get('input[name="ekMalzeme"][value="sosis"]').check();
  
      // Assert that the selected checkboxes are checked
      cy.get('input[name="ekMalzeme"][value="pepperoni"]').should('be.checked');
      cy.get('input[name="ekMalzeme"][value="domates"]').should('be.checked');
      cy.get('input[name="ekMalzeme"][value="biber"]').should('be.checked');
      cy.get('input[name="ekMalzeme"][value="sosis"]').should('be.checked');
    });
  
    it('should disable submit button when form is invalid', () => {
      // Submit form with missing required fields
      cy.get('button[type="submit"]').should('be.disabled');
      
      // Fill in required fields
      cy.get('input[name="fullname"]').type('Ömer Bayram');
      cy.get('input[name="pizzaSize"][value="Small"]').check();
      cy.get('select[name="pizzaHamur"]').select('Klasik Hamur');
      
      // Add minimum required ingredients
      cy.get('input[name="ekMalzeme"][value="pepperoni"]').check();
      cy.get('input[name="ekMalzeme"][value="domates"]').check();
      cy.get('input[name="ekMalzeme"][value="biber"]').check();
      cy.get('input[name="ekMalzeme"][value="sosis"]').check();
      
      // Enable submit button
      cy.get('button[type="submit"]').should('not.be.disabled');
  
      // Submit form
      cy.intercept('POST', 'https://reqres.in/api/pizza', {
        statusCode: 201,
        body: {
          id: '123',
          createdAt: new Date().toISOString(),
        },
      }).as('postOrder');
      
      cy.get('button[type="submit"]').click();
      
      // Assert that the form was submitted
      cy.wait('@postOrder').its('response.statusCode').should('eq', 201);
      cy.get('@postOrder').then((response) => {
        cy.log('Sipariş Özeti');
        cy.log('ID:', response.response.body.id);
        cy.log('Oluşturulma Tarihi:', response.response.body.createdAt);
      });
    });
  });