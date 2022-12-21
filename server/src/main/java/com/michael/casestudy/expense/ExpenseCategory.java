package com.michael.casestudy.expense;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * Entity class to keep track of Expense types
 */
@Entity
@Data
@RequiredArgsConstructor
public class ExpenseCategory {
    @Id
    private String id;
    private String description;
}
