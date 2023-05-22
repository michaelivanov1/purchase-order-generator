import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorHomeComponent } from './vendor/vendor-home/vendor-home.component';
import { ProductHomeComponent } from '@app/product/product-home/product-home.component';
import { GeneratorComponent } from '@app/report/generator/generator.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'vendors', component: VendorHomeComponent, title: 'Vendors' },
  { path: 'products', component: ProductHomeComponent, title: 'Products' },
  { path: 'generator', component: GeneratorComponent, title: 'Generator' },
  { path: '', component: HomeComponent, title: 'Home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }