package com.michael.casestudy.product;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import java.math.BigDecimal;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

/**
 * Product entity
 */
@Entity
@Data
@RequiredArgsConstructor
public class Product {
    @Id
    // @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    private int vendorid;
    private String name;
    // costprice – is what we purchase the good for, make sure it is lower than MSRP
    private BigDecimal costprice;
    // msrp – this is the selling price must be lower than cost price
    private BigDecimal msrp;
    // rop – is the Reorder Point, when stock falls to this # we re-order the good
    private int rop;
    // eoq – is the Economic Order Quantity this is a value calculated by some 
    // counter who has figured out that it makes most economic sense to order this
    // amount. 
    private int eoq;
    // qoh – Quantity on Hand, what we have in inventory
    private int qoh;
    // qoo – Quantity on Order. what we have ordered but not received
    private int qoo;
    // qrcode 
    @Lob
    private byte[] qrcode;
    // qrcodetxt 
    private String qrcodetxt;

    @Basic(optional = true)
    @Lob
    private String receiptscan;

    public void generateQRCode(byte[] generateQRCode) {
    }
}
