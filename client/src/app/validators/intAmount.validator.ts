import { AbstractControl } from '@angular/forms';

export function intAmountValidator(control: AbstractControl): { invalidInt: boolean } | null {
    const INT_REGEXP = /^\d+$/;
    if (!INT_REGEXP.test(control.value)) { return { invalidInt: true }; } else { return null; }
} 