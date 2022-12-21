import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    ProductHomeComponent,
    ProductListComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ]
})
export class ProductModule { }
