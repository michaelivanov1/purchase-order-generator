import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Vendor } from '@app/vendor/vendor';
import { Product } from '@app/product/product';
import { PurchaseOrderLineItem } from '@app/report/purchaseorder-lineitem';
import { PurchaseOrder } from '@app/report/purchaseorder';
import { VendorService } from '@app/vendor/vendor.service';
import { ProductService } from '@app/product/product.service';
import { PurchaseOrderService } from '@app/report/purchaseorder.service';

import { PDFURL } from '@app/constants';

@Component({
  templateUrl: './generator.component.html',
})

export class GeneratorComponent implements OnInit, OnDestroy {
  // form
  generatorForm: FormGroup;
  vendorid: FormControl;
  productid: FormControl;
  productqty: FormControl;
  // data
  formSubscription?: Subscription;
  products$?: Observable<Product[]>; // everybody's products
  vendors$?: Observable<Vendor[]>; // all vendors
  vendorproducts$?: Observable<Product[]>; // all products for a particular vendor
  items: Array<PurchaseOrderLineItem>; // product items that will be in report
  selectedproducts: Product[]; // products that being displayed currently in app
  selectedProduct: Product; // the current selected product
  selectedVendor: Vendor; // the current selected vendor
  selectedQty: any;

  qtyarray: any[] = ['EOQ', 0, 1, 2, 3, 4, 5];


  // misc
  pickedProduct: boolean;
  pickedVendor: boolean;
  generated: boolean;
  hasProducts: boolean;
  msg: string;
  total: number;
  purchaseordernumber: number = 0;
  sub: number = 0;
  tax: number = 0.0;

  constructor(
    private builder: FormBuilder,
    private vendorService: VendorService,
    private productService: ProductService,
    private purchaseOrderService: PurchaseOrderService
  ) {
    this.pickedVendor = false;
    this.pickedProduct = false;
    this.generated = false;
    this.msg = '';
    this.selectedQty = 0;
    this.sub = 0;
    this.tax = 0.0;
    this.vendorid = new FormControl('');
    this.productid = new FormControl('');
    this.productqty = new FormControl('');
    this.generatorForm = this.builder.group({
      productid: this.productid,
      vendorid: this.vendorid,
      productqty: this.productqty,
    });
    this.selectedProduct = {
      id: '',
      vendorid: 0,
      name: '',
      costprice: 0.0,
      msrp: 0.0,
      rop: 0,
      eoq: 0,
      qoh: 0,
      qoo: 0,
      qrcode: '',
      qrcodetxt: '',
    };

    this.selectedVendor = {
      id: 0,
      title: '',
      name: '',
      email: '',
      phone: '',
      address1: '',
      city: '',
      province: '',
      postalcode: '',
      type: ''
    };
    this.items = new Array<PurchaseOrderLineItem>();
    this.selectedproducts = new Array<Product>();
    this.hasProducts = false;
    this.total = 0.0;
  } // constructor

  ngOnInit(): void {
    this.onPickVendor();
    this.onPickProduct();
    this.onPickQty();
    this.msg = 'loading vendors and products from server...';
    (this.vendors$ = this.vendorService.get()),
      catchError((err) => (this.msg = err.message));
    (this.products$ = this.productService.get()),
      catchError((err) => (this.msg = err.message));
    this.msg = 'server data loaded';
  } // ngOnInit

  ngOnDestroy(): void {
    if (this.formSubscription !== undefined) {
      this.formSubscription.unsubscribe();
    }
  } // ngOnDestroy

  /**
  * onPickVendor - Another way to use Observables, subscribe to the select change event
  * then load specific vendor products for subsequent selection
  */
  onPickVendor(): void {
    this.formSubscription = this.generatorForm
      .get('vendorid')
      ?.valueChanges.subscribe((val) => {
        this.selectedProduct = {
          id: '',
          vendorid: 0,
          name: '',
          costprice: 0.0,
          msrp: 0.0,
          rop: 0,
          eoq: 0,
          qoh: 0,
          qoo: 0,
          qrcode: '',
          qrcodetxt: '',
        };
        this.selectedVendor = val;
        this.loadVendorProducts();
        this.pickedProduct = false;
        this.hasProducts = false;
        this.msg = 'choose product for vendor';
        this.pickedVendor = true;
        this.generated = false;
        this.items = []; // array for the report
        this.selectedproducts = []; // array for the details in app html
      });
  } // onPickVendor

  onPickQty(): void {
    const productSubscription = this.generatorForm.get('productqty')
      ?.valueChanges.subscribe((val) => {
        this.selectedQty = val;

        if (this.selectedQty == 0) {
          this.items = this.items.filter((filter) => filter.productid != this.selectedProduct?.id)
        }

        else {

          if (this.selectedQty === 'EOQ') {
            this.selectedQty = this.selectedProduct.eoq;
          }


          const item: PurchaseOrderLineItem = {
            id: 0,
            reportid: 0,
            productid: this.selectedProduct?.id,
            price: this.selectedProduct.costprice,
            qty: this.selectedQty,
          }

          if (this.items.find((item) => item.productid === this.selectedProduct?.id)) {
            this.msg = "Updated Quantity";
            this.items = this.items.filter((product) => product.productid !== this.selectedProduct.id);
            this.items.push(item);
          } else {
            // add entry
            this.msg = 'Product Added';
            this.items.push(item);
            this.selectedproducts.push(this.selectedProduct);
          }

          this.total = 0.0;
          this.items.forEach((exp) => (this.total += exp.price * exp.qty));
          this.tax = this.total * 0.13;
        }

        if (this.items.length > 0) {
          this.hasProducts = true;
        } else if (this.items.length == 0) {
          this.hasProducts = false;
          this.msg = 'All products removed';
        }

      });
    this.formSubscription?.add(productSubscription);
  }

  /**
  * onPickProduct - subscribe to the select change event then
  * update array containing items.
  */
  onPickProduct(): void {
    this.formSubscription = this.generatorForm
      .get('productid')
      ?.valueChanges.subscribe((val) => {
        this.pickedProduct = true;
        this.selectedProduct = val;
        this.msg = 'Choose a Quantity';
      });
  }

  /**
  * loadVendorProducts - filter for a particular vendor's products
  */
  loadVendorProducts(): void {
    this.vendorproducts$ = this.products$?.pipe(
      map((products) =>
        // map each product in the array and check whether or not it belongs to selected vendor
        products.filter(
          (product) => product.vendorid === this.selectedVendor?.id
        )
      )
    );
  } // loadVendorProducts

  /**
  * createReport - create the client side report
  */
  createReport(): void {
    this.generated = false;
    const report: PurchaseOrder = {
      id: 0,
      items: this.items,
      vendorid: this.selectedProduct.vendorid,
      amount: 0,
      qty: 0,
    };
    this.purchaseOrderService.add(report).subscribe({
      // observer object
      next: (report: PurchaseOrder) => {
        // server should be returning report with new id
        report.id > 0
          ? (this.msg = `Report ${report.id} added!`)
          : (this.msg = 'Report not added! - server error');
        this.purchaseordernumber = report.id;
      },
      error: (err: Error) => (this.msg = `Report not added! - ${err.message}`),
      complete: () => {
        this.hasProducts = false;
        this.pickedVendor = false;
        this.pickedProduct = false;
        this.generated = true;
      },
    });
  } // createReport

  viewPdf(): void {
    window.open(`${PDFURL}${this.purchaseordernumber}`, '');
  } // viewPdf
} // GeneratorComponent