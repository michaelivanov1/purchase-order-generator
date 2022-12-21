import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';

@Component({
    selector: 'app-product-list',
    template: `
 <mat-list-item
 *ngFor="let product of products"
 layout="row"
 class="pad-xs mat-title"
 (click)="selected.emit(product)"
 >
 {{product.id}}  {{ product.name }}  {{product.vendorid}}
 </mat-list-item>
 `,
})

export class ProductListComponent {
    @Input() products?: Product[];
    @Output() selected = new EventEmitter();
} // ProductListComponent
