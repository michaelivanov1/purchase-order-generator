package com.michael.casestudy.purchaseorder;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

// @Repository so Spring treats this interface as a repository
@Repository
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "purchaseorders", path = "purchaseorders")
public interface PurchaseOrderRepository extends CrudRepository<PurchaseOrder, Long> {
    // extend so we can return the number of rows deleted
    @Modifying
    @Transactional
    @Query("delete from PurchaseOrder where id = ?1")
    int deleteOne(Long purchaseOrderID);
}