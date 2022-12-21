describe('report generator test', () => {
    it('visits the root', () => {
        cy.visit('/');
    });
    it('clicks the menu button generator option', () => {
        cy.get('mat-icon').click();
        cy.contains('a', 'generator').click();
    });
    it('selects a vendor', () => {
        cy.wait(500);
        cy.get('mat-select[formControlName="vendorid"]').click();
        cy.contains('Michael Ivanov').click();
    });
    it('selects a product', () => {
        cy.get('mat-select[formControlName="productid"]').click();
        cy.contains('iPhone 13').click();
    });
    it('selects a Qty', () => {
        cy.wait(500);
        cy.get('mat-select[formControlName="productqty"]').click();
        cy.contains('EOQ').click();
    });
    it('clicks the save button', () => {
        cy.get('button').contains('Add PO').click();
    });
    it('confirms report added', () => {
        cy.contains('added!');
    });
});