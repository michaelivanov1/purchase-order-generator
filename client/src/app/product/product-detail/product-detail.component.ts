import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl,
} from '@angular/forms';
import { Product } from '@app/product/product';
import { Vendor } from '@app/vendor/vendor';
import { decimalAmountValidator } from '@app/validators/decimalAmount.validator';
import { intAmountValidator } from '@app/validators/intAmount.validator';
import { DeleteDialogComponent } from '@app/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
})

export class ProductDetailComponent implements OnInit {
    // setter
    @Input() selectedProduct: Product = {
        id: '',
        vendorid: 0,
        name: '',
        costprice: 0,
        msrp: 0,
        rop: 0,
        eoq: 0,
        qoh: 0,
        qoo: 0,
        qrcode: '',
        qrcodetxt: '',
    };

    @Input() vendors: Vendor[] | null = null;
    @Input() products: Product[] | undefined;
    @Output() cancelled = new EventEmitter();
    @Output() saved = new EventEmitter();
    @Output() deleted = new EventEmitter();

    productForm: FormGroup;
    id: FormControl;
    vendorid: FormControl;
    name: FormControl;
    costprice: FormControl;
    msrp: FormControl;
    rop: FormControl;
    eoq: FormControl;
    qoh: FormControl;
    qoo: FormControl;
    qrcode: FormControl;
    qrcodetxt: FormControl;

    constructor(private builder: FormBuilder, private dialog: MatDialog) {
        this.name = new FormControl('', Validators.compose([Validators.required]));
        this.vendorid = new FormControl('', Validators.compose([Validators.required]));
        this.id = new FormControl('', Validators.compose([this.uniqueCodeValidator.bind(this), Validators.required])),
        this.costprice = new FormControl('', Validators.compose([Validators.required, decimalAmountValidator]));
        this.msrp = new FormControl('', Validators.compose([Validators.required, decimalAmountValidator]));
        this.rop = new FormControl('', Validators.compose([Validators.required, intAmountValidator]));
        this.eoq = new FormControl('', Validators.compose([Validators.required, intAmountValidator]));
        this.qoh = new FormControl('', Validators.compose([Validators.required, intAmountValidator]));
        this.qoo = new FormControl('', Validators.compose([Validators.required, intAmountValidator]));
        this.qrcode = new FormControl('');
        this.qrcodetxt = new FormControl('', Validators.compose([Validators.required]));

        this.productForm = new FormGroup({
            //title: this.title,
            name: this.name,
            id: this.id,
            vendorid: this.vendorid,
            costprice: this.costprice,
            msrp: this.msrp,
            rop: this.rop,
            eoq: this.eoq,
            qoh: this.qoh,
            qoo: this.qoo,
            qrcode: this.qrcode,
            qrcodetxt: this.qrcodetxt,
        });
    } // constructor

    ngOnInit(): void {
        // patchValue doesn’t care if all values present
        this.productForm.patchValue({
            //title: this.selectedProduct.title,
            name: this.selectedProduct.name,
            id: this.selectedProduct.id,
            vendorid: this.selectedProduct.vendorid,
            costprice: this.selectedProduct.costprice,
            msrp: this.selectedProduct.msrp,
            rop: this.selectedProduct.rop,
            eoq: this.selectedProduct.eoq,
            qoh: this.selectedProduct.qoh,
            qoo: this.selectedProduct.qoo,
            qrcode: this.selectedProduct.qrcode,
            qrcodetxt: this.selectedProduct.qrcodetxt,
        });
    } // ngOnInit

    updateSelectedProduct(): void {
        //this.selectedProduct.title = this.productForm.value.title;
        this.selectedProduct.name = this.productForm.value.name;
        this.selectedProduct.id = this.productForm.value.id;
        this.selectedProduct.vendorid = this.productForm.value.vendorid;
        this.selectedProduct.costprice = this.productForm.value.costprice;
        this.selectedProduct.msrp = this.productForm.value.msrp;
        this.selectedProduct.rop = this.productForm.value.rop;
        this.selectedProduct.eoq = this.productForm.value.eoq;
        this.selectedProduct.qoh = this.productForm.value.qoh;
        this.selectedProduct.qoo = this.productForm.value.qoo;
        this.selectedProduct.qrcode = this.productForm.value.qrcode;
        this.selectedProduct.qrcodetxt = this.productForm.value.qrcodetxt;
        this.saved.emit(this.selectedProduct);
    }

    /**
    * uniqueCodeValidator - needed access to products property so not
    * with the rest of the validators
    */
    productsIDArray: String[] = [];
    uniqueCodeValidator(control: AbstractControl): { idExists: boolean } | null {

        this.products?.forEach(e => {
            this.productsIDArray.push(e.id);
        })

        if (this.products !== undefined) {
            if (
                this.productsIDArray.find((p) => p === control.value && !this.selectedProduct.id) !== undefined) {
                return { idExists: true };
            }
        }
        return null; // if we make it here there are no product codes
    } // uniqueCodeValidator

    openDeleteDialog(selectedProduct: Product): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.data = {
            title: `Delete Product ${this.selectedProduct.id}`,
            entityname: 'product'
        };
        dialogConfig.panelClass = 'customdialog';
        const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleted.emit(this.selectedProduct);
            }
        });
    } // openDeleteDialog

} // ProductDetailComponent