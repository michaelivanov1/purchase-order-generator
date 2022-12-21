package com.michael.casestudy.expense;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

/**
 * Expense entity
 */
@Entity
@Data
@RequiredArgsConstructor
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    private long vendorid; // FK
    private String categoryid; // FK
    private String description;
    private boolean receipt;
    private BigDecimal amount;
    private String dateincurred;
    // needed in 2nd case study
    @Basic(optional = true)
    @Lob
    private String receiptscan;
}
