package com.michael.casestudy.purchaseorder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderDAO purchaseorderDAO;
    @Autowired
    private PurchaseOrderRepository poRepository;

    @PostMapping("/api/purchaseorders")
    public ResponseEntity<PurchaseOrder> addOne(@RequestBody PurchaseOrder clientrep) { // use RequestBody here
        return new ResponseEntity<PurchaseOrder>(purchaseorderDAO.create(clientrep), HttpStatus.OK);
    }

    @GetMapping("/api/pos")
    public ResponseEntity<Iterable<PurchaseOrder>> findAll() {
        Iterable<PurchaseOrder> pos = poRepository.findAll();
        return new ResponseEntity<Iterable<PurchaseOrder>>(pos, HttpStatus.OK);
    }
}
