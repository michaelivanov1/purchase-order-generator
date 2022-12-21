package com.michael.casestudy.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    // will return the number of rows deleted
    @Modifying
    @Transactional
    @Query("delete from Product where id = ?1")
    int deleteOne(String productid);
}
