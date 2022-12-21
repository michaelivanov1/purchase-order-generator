package com.michael.casestudy.expense;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ExpenseRepository extends CrudRepository<Expense, Long> {
    // will return the number of rows deleted
    @Modifying
    @Transactional
    @Query("delete from Expense where id = ?1")
    int deleteOne(Long expenseid);
}
