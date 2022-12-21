import { PurchaseOrderLineItem } from './purchaseorder-lineitem';
/**
* PurchaseOrder - interface for product report
*/
export interface PurchaseOrder {
 id: number;
 vendorid: number;
 amount: number;
 qty: number;
 items: PurchaseOrderLineItem[];

}