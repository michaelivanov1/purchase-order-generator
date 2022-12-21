package com.michael.casestudy.purchaseorder;

import java.time.LocalDateTime;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.michael.casestudy.product.Product;
import com.michael.casestudy.product.ProductRepository;

@Component
public class PurchaseOrderDAO {
    @PersistenceContext
    private EntityManager entityManager;
    
    @Autowired
    private ProductRepository prodRepo;

    @Transactional
    public PurchaseOrder create(PurchaseOrder clientrep) {
        PurchaseOrder realPurchaseOrder = new PurchaseOrder();
        realPurchaseOrder.setVendorid(clientrep.getVendorid());
        realPurchaseOrder.setAmount(clientrep.getAmount());
        realPurchaseOrder.setPodate(LocalDateTime.now());
        entityManager.persist(realPurchaseOrder);
        for (PurchaseOrderLineitem item : clientrep.getItems()) {
            PurchaseOrderLineitem realItem = new PurchaseOrderLineitem();
            realItem.setPoid(realPurchaseOrder.getId());
            realItem.setProductid(item.getProductid());
            realItem.setQty(item.getQty());

            // we also need to update the QOO on the product table
            Product prod = prodRepo.getReferenceById(item.getProductid());
            prod.setQoo(prod.getQoo() + item.getQty());
            prodRepo.saveAndFlush(prod);

            realItem.setPrice(item.getPrice());
            entityManager.persist(realItem);
        }
        entityManager.refresh(realPurchaseOrder);
        return realPurchaseOrder;
    }
}
