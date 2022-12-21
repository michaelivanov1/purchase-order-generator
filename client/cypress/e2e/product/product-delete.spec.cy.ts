describe('product delete test', () => {

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

    it('clicks the delete button', () => {
        cy.get('button').contains('Delete').click();
    });

    it("clicks the dialog's Yes button", () => {
        cy.get('button').contains('Yes').click();
    });

    it('confirms delete', () => {
        cy.contains('deleted!');
    });
});