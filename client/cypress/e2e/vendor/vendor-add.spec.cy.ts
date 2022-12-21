describe('vendor add test', () => {
    it('visits the root', () => {
        cy.visit('/');
    });

    it('clicks the menu button vendors option', () => {
        cy.get('mat-icon').click();
        cy.contains('a', 'vendors').click();
    });

    it('clicks add icon', () => {
        cy.contains('control_point').click();
    });

    it('fills in fields', () => {
        // cy.get('input[formcontrolname=title').type('Mr.');
        cy.get('input[formcontrolname=name').type('Cypress');
        cy.get('input[formcontrolname=email').type('cypress@test.com');
        cy.get('input[formcontrolname=phone').type('(555)123-1322');
        cy.get('input[formcontrolname=address1').type('123 Cypress Ave');
        cy.get('input[formcontrolname=city').type('Toronto');

        cy.get('mat-select[formcontrolname="province"]').click();
        cy.get('mat-option').contains('Ontario').click();

        cy.get('input[formcontrolname=postalcode').type('N12D1T');

        cy.get('mat-select[formcontrolname="type"]').click();
        cy.get('mat-option').contains('Trusted').click();
    });

    it('clicks the save button', () => {
        cy.get('button').contains('Save').click();
        cy.wait(500);
    });

    it('confirms add', () => {
        cy.contains('added!');
    });
});