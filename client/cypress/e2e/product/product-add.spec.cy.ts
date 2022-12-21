describe('product add test', () => {
    it('visits the root', () => {
        cy.visit('/');
    });

    it('goes to products', () => {
        cy.get('mat-icon').click();
        cy.contains('a', 'products').click();
    });

    it('clicks add icon', () => {
        cy.contains('control_point').click();
    });

    it('fills in fields', () => {
        cy.get('input[formcontrolname=id]').type('10x70');
        cy.get('mat-select[formcontrolname="vendorid"]').click(); 
        cy.get('mat-option').contains('Michael Ivanov').click();
        cy.get('input[formcontrolname=name]').type('specCyTest');
        cy.get('input[formcontrolname=msrp]').clear();
        cy.get('input[formcontrolname=msrp]').type('60.00');
        cy.get('input[formcontrolname=costprice]').clear();
        cy.get('input[formcontrolname=costprice]').type('109.99');
        cy.get('.mat-expansion-indicator').eq(1).click();

        cy.get('input[formcontrolname=rop]').clear();
        cy.get('input[formcontrolname=rop]').type('10');
        cy.get('input[formcontrolname=eoq]').clear();
        cy.get('input[formcontrolname=eoq]').type('20');
        cy.get('input[formcontrolname=qoh]').clear();
        cy.get('input[formcontrolname=qoh]').type('30');
        cy.get('input[formcontrolname=qoo]').clear();
        cy.get('input[formcontrolname=qoo]').type('40');
    });

    it('clicks the save button', () => {
        cy.get('button').contains('Save').click();
    });
    
    it('confirms add', () => {
        cy.contains('added!');
    });
});