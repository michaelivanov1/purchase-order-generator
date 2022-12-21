import { AbstractControl } from '@angular/forms';

export function decimalAmountValidator(control: AbstractControl): { invalidExpenseAmount: boolean } | null {
    const AMOUNT_REGEXP = /^\d+(\.\d{1,2})?$/i;
    return !AMOUNT_REGEXP.test(control.value) ? { invalidExpenseAmount: true } : null;
} // ValidatePhone
