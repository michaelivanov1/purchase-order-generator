describe('product update test', () => {

    it('visits the root', () => {
        cy.visit('/');
    });

    it('clicks the menu button product option', () => {
        cy.get('mat-icon').click();
        cy.contains('a', 'products').click();
    });

    it('selects specCyTest', () => {
        cy.contains('10x70').click();
    });

    it('updates costprice', () => {
        cy.get('input[formcontrolname=costprice]').clear({force: true});
        cy.get('input[formcontrolname=costprice]').type('140.00', {force: true});
    });

    it('clicks the save button', () => {
        cy.get('button').contains('Save').click();
    });

    it('confirms update', () => {
        cy.contains('added!');
    });
});