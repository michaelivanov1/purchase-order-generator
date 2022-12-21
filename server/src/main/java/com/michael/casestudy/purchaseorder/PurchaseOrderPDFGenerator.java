package com.michael.casestudy.purchaseorder;

import java.util.logging.Level;
import java.util.logging.Logger;

import com.michael.casestudy.vendor.VendorRepository;
import com.michael.casestudy.product.Product;
import com.michael.casestudy.product.ProductRepository;
import com.michael.casestudy.vendor.Vendor;

import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

import org.springframework.web.servlet.view.document.AbstractPdfView;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.net.URL;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Optional;

public abstract class PurchaseOrderPDFGenerator extends AbstractPdfView {

        public static ByteArrayInputStream generatePurchaseOrder(
                        String po,
                        PurchaseOrderRepository purchaseorderRepository,
                        VendorRepository vendorRepository,
                        ProductRepository productRepository)
                        throws IOException {

                URL imageUrl = PurchaseOrderPDFGenerator.class.getResource("/static/assets/images/logo.png");
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                PdfWriter writer = new PdfWriter(baos);

                // Initialize PDF document to be written to a stream not a file
                PdfDocument pdf = new PdfDocument(writer);

                // Document is the main object
                Document document = new Document(pdf);

                PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);

                // add the image to the document
                PageSize pg = PageSize.A4;
                Image img = new Image(ImageDataFactory.create(imageUrl)).scaleAbsolute(60, 60)
                                .setFixedPosition(pg.getWidth() / 2 - 30, 750);
                document.add(img);

                // add a big heading
                document.add(new Paragraph("\n\n"));
                Locale locale = new Locale("en", "US");
                NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);

                try {
                        document.add(new Paragraph("\n"));
                        Optional<PurchaseOrder> optPurchaseOrder = purchaseorderRepository
                                        .findById(Long.parseLong(po));

                        if (optPurchaseOrder.isPresent()) {
                                PurchaseOrder purchaseorder = optPurchaseOrder.get();
                                document.add(new Paragraph("PurchaseOrder# " + po)
                                                .setFont(font)
                                                .setFontSize(16)
                                                .setBold()
                                                .setMarginTop(-10)
                                                .setTextAlignment(TextAlignment.CENTER));
                                document.add(new Paragraph("\n\n"));

                                BigDecimal subTotal = new BigDecimal(0.0);
                                BigDecimal taxValue = new BigDecimal(0.0);

                                Optional<Vendor> opte = vendorRepository.findById(purchaseorder.getVendorid());
                                Vendor vendor = opte.get();

                                if (opte.isPresent()) {
                                        Table vendorTable = new Table(1);
                                        vendorTable.setWidth(new UnitValue(UnitValue.PERCENT, 100));

                                        Cell vendorCell = new Cell()
                                                        .add(new Paragraph(
                                                                        "Vendor: " + vendor.getName() + "\n"
                                                                                        + "Address: "
                                                                                        + vendor.getAddress1() + "\n"
                                                                                        + "City: " + vendor.getCity()
                                                                                        + "\n"
                                                                                        + "Province: "
                                                                                        + vendor.getProvince() + "\n"
                                                                                        + "Email: "
                                                                                        + vendor.getEmail()))
                                                        .setFont(font)
                                                        .setFontSize(11)
                                                        .setBold()
                                                        .setTextAlignment(TextAlignment.LEFT);
                                        vendorTable.addCell(vendorCell);
                                        document.add(vendorTable);
                                        document.add(new Paragraph("\n"));

                                        Table productTable = new Table(5);
                                        productTable.setWidth(new UnitValue(UnitValue.PERCENT, 100));

                                        // table headings
                                        Cell cell = new Cell().add(new Paragraph("Product Code")
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setTextAlignment(TextAlignment.CENTER);
                                        productTable.addCell(cell);
                                        cell = new Cell().add(new Paragraph("Description")
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setTextAlignment(TextAlignment.CENTER);
                                        productTable.addCell(cell);
                                        cell = new Cell().add(new Paragraph("Qty Sold")
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setTextAlignment(TextAlignment.CENTER);
                                        productTable.addCell(cell);
                                        cell = new Cell().add(new Paragraph("Price")
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setTextAlignment(TextAlignment.CENTER);
                                        productTable.addCell(cell);
                                        cell = new Cell().add(new Paragraph("Ext. Price")
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setTextAlignment(TextAlignment.CENTER);
                                        productTable.addCell(cell);

                                        // dump out the line items
                                        for (PurchaseOrderLineitem line : purchaseorder.getItems()) {
                                                Optional<Product> optx = productRepository
                                                                .findById(line.getProductid());

                                                if (optx.isPresent()) {
                                                        Product product = optx.get();

                                                        // table data
                                                        cell = new Cell().add(
                                                                        new Paragraph(product.getId()))
                                                                        .setFont(font)
                                                                        .setFontSize(12)
                                                                        .setTextAlignment(
                                                                                        TextAlignment.CENTER);
                                                        productTable.addCell(cell);

                                                        cell = new Cell().add(new Paragraph(product.getName())
                                                                        .setFont(font)
                                                                        .setFontSize(12)
                                                                        .setTextAlignment(TextAlignment.CENTER));
                                                        productTable.addCell(cell);

                                                        cell = new Cell().add(new Paragraph(line.getQty() + "")
                                                                        .setFont(font)
                                                                        .setFontSize(12)
                                                                        .setTextAlignment(TextAlignment.CENTER));
                                                        productTable.addCell(cell);

                                                        cell = new Cell()
                                                                        .add(new Paragraph(
                                                                                        formatter.format(product
                                                                                                        .getCostprice())))
                                                                        .setFont(font)
                                                                        .setFontSize(12)
                                                                        .setTextAlignment(TextAlignment.CENTER);
                                                        productTable.addCell(cell);

                                                        BigDecimal cost = product.getCostprice();

                                                        // price before taxes
                                                        subTotal = subTotal.add(cost
                                                                        .multiply((BigDecimal.valueOf(line.getQty()))),
                                                                        new MathContext(8, RoundingMode.UP));

                                                        // tax payed
                                                        taxValue = subTotal
                                                                        .multiply(BigDecimal.valueOf(0.13));
                                                        taxValue.add(taxValue);

                                                        cell = new Cell()
                                                                        .add(new Paragraph(formatter.format(cost
                                                                                        .multiply(BigDecimal.valueOf(
                                                                                                        line.getQty())))))
                                                                        .setFont(font)
                                                                        .setFontSize(12)
                                                                        .setTextAlignment(TextAlignment.CENTER);
                                                        productTable.addCell(cell);

                                                }

                                        }

                                        BigDecimal finalTotal;
                                        finalTotal = subTotal.add(taxValue);

                                        Table totalsTable = new Table(2);
                                        totalsTable.setWidth(new UnitValue(UnitValue.PERCENT, 100));

                                        // purchaseorder total headings
                                        cell = new Cell().add(new Paragraph("Sub Total:"))
                                                        .setBorder(Border.NO_BORDER)
                                                        .setTextAlignment(TextAlignment.RIGHT);
                                        totalsTable.addCell(cell);

                                        // purchaseorder total data
                                        cell = new Cell().add(new Paragraph(formatter.format(subTotal)))
                                                        .setTextAlignment(TextAlignment.CENTER)
                                                        .setBackgroundColor(ColorConstants.YELLOW);
                                        totalsTable.addCell(cell);

                                        cell = new Cell().add(new Paragraph("Tax:"))
                                                        .setBorder(Border.NO_BORDER)
                                                        .setTextAlignment(TextAlignment.RIGHT);
                                        totalsTable.addCell(cell);

                                        cell = new Cell().add(new Paragraph(formatter.format(taxValue)))
                                                        .setTextAlignment(TextAlignment.CENTER)
                                                        .setBackgroundColor(ColorConstants.YELLOW);
                                        totalsTable.addCell(cell);

                                        cell = new Cell().add(new Paragraph("PO Total:"))
                                                        .setBorder(Border.NO_BORDER)
                                                        .setTextAlignment(TextAlignment.RIGHT);
                                        totalsTable.addCell(cell);

                                        cell = new Cell().add(new Paragraph(formatter.format(finalTotal)))
                                                        .setTextAlignment(TextAlignment.CENTER)
                                                        .setBackgroundColor(ColorConstants.YELLOW);
                                        totalsTable.addCell(cell);

                                        document.add(productTable);
                                        document.add(totalsTable);

                                }

                                document.add(new Paragraph("\n\n"));
                                DateTimeFormatter dateFormatter = DateTimeFormatter
                                                .ofPattern("yyyy-MM-dd h:mm a");
                                document.add(new Paragraph("Date created: " + dateFormatter.format(LocalDateTime.now()))
                                                .setTextAlignment(TextAlignment.CENTER));

                                document.close();

                        }
                } catch (Exception ex) {
                        Logger.getLogger(PurchaseOrderPDFGenerator.class.getName()).log(Level.SEVERE, null, ex);
                }
                // finally send stream back to the controller
                return new ByteArrayInputStream(baos.toByteArray());
        }

}
