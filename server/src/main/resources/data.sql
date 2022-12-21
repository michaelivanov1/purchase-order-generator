INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email)VALUES ('123 Maple
St','Mississauga','On', 'N1N-1N1','(555)555-5555','Trusted','ABC Supply Co.','abc@supply.com');

INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('543
Sycamore Ave','Toronto','On', 'N1P-1N1','(999)555-5555','Trusted','Big Bills
Depot','bb@depot.com');

INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('922 Oak
St','Sarnia','On', 'N1N-1N1','(555)555-5599','Untrusted','Shady Sams','ss@underthetable.com');

INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('922 Oak
St','Toronto','On', 'N1N-1N1','(416)522-1462','Untrusted','Michael Ivanov','mi@gmail.com');

-- add expense categories
INSERT INTO Expense_Category (Id, Description) VALUES ('BSM','Business Meetings');
INSERT INTO Expense_Category (Id, Description) VALUES ('ENT','Entertainment');
INSERT INTO Expense_Category (Id, Description) VALUES ('PARK','Parking');
INSERT INTO Expense_Category (Id, Description) VALUES ('LDG','Lodging');
INSERT INTO Expense_Category (Id, Description) VALUES ('TRAV','Travel');
INSERT INTO Expense_Category (Id, Description) VALUES ('MEAL','Meals');
INSERT INTO Expense_Category (Id, Description) VALUES ('TUI','Tuition');
INSERT INTO Expense_Category (Id, Description) VALUES ('MISC','Miscealleous');
INSERT INTO Expense_Category (Id, Description) VALUES ('OTH','OTHER');

-- add some expenses to seed the table
INSERT INTO Expense (VendorId,CategoryId,Description,Receipt,DateIncurred,Amount)
 VALUES (1,'FLGHT','Flight to Convention',true,'2022-04-12',319.99);
INSERT INTO Expense (VendorId,CategoryId,Description,Receipt,DateIncurred,Amount)
 VALUES (1,'HSE','House for Convention',true,'2022-04-15',219.99);
INSERT INTO Expense (VendorId,CategoryId,Description,Receipt,DateIncurred,Amount)
 VALUES (1,'MEAL','Food at Convention',true,'2022-04-13',39.99);
INSERT INTO Expense (VendorId,CategoryId,Description,Receipt,DateIncurred,Amount)
 VALUES (2,'TUI','Tuition for Cobol course',true,'2022-05-19',29.99);
INSERT INTO Expense (VendorId,CategoryId,Description,Receipt,DateIncurred,Amount)
 VALUES (2,'MISC','Bought widgets for the office',true,'2022-05-20',19.99);
INSERT INTO Expense (VendorId,CategoryId,Description,Receipt,DateIncurred,Amount)
 VALUES (2,'OTH','Donation for Cancer Society',true,'2022-05-21',20.00);

INSERT INTO Product (Id, VendorId,Name,Msrp,Costprice,Rop, Eoq, Qoh, Qoo, Qrcode, Qrcodetxt)
 VALUES ('10x20', 1,'iPhone 12',400.00,390.00,40,40,20,20,'','');
INSERT INTO Product (Id, VendorId,Name,Msrp,Costprice,Rop, Eoq, Qoh, Qoo, Qrcode, Qrcodetxt)
 VALUES ('10x40', 4,'iPhone 13',600.00,510.00,20,20,40,30,'','');
 INSERT INTO Product (Id, VendorId,Name,Msrp,Costprice,Rop, Eoq, Qoh, Qoo, Qrcode, Qrcodetxt)
 VALUES ('20x20', 3,'iPhone 10',600.00,510.00,20,20,40,30,'','');
 INSERT INTO Product (Id, VendorId,Name,Msrp,Costprice,Rop, Eoq, Qoh, Qoo, Qrcode, Qrcodetxt)
 VALUES ('20x10', 2,'iPhone 9',600.00,510.00,20,20,40,30,'','');
  INSERT INTO Product (Id, VendorId,Name,Msrp,Costprice,Rop, Eoq, Qoh, Qoo, Qrcode, Qrcodetxt)
 VALUES ('20x30', 4,'iPhone 8',600.00,510.00,20,20,40,30,'','');
   INSERT INTO Product (Id, VendorId,Name,Msrp,Costprice,Rop, Eoq, Qoh, Qoo, Qrcode, Qrcodetxt)
 VALUES ('20x40', 3,'iPhone 10',600.00,510.00,20,20,40,30,'','');
 INSERT INTO Product (Id, VendorId,Name,Msrp,Costprice,Rop, Eoq, Qoh, Qoo, Qrcode, Qrcodetxt)
 VALUES ('30x20', 2,'iPhone 8',450.00,300.00,40,40,20,20,'','');
INSERT INTO Product (Id, VendorId,Name,Msrp,Costprice,Rop, Eoq, Qoh, Qoo, Qrcode, Qrcodetxt)
 VALUES ('30x40', 6,'iPhone 7',650.00,430.00,20,20,40,30,'','');
 INSERT INTO Product (Id, VendorId,Name,Msrp,Costprice,Rop, Eoq, Qoh, Qoo, Qrcode, Qrcodetxt)
 VALUES ('40x20', 5,'iPhone 7',300.00,450.00,20,20,40,30,'','');
 INSERT INTO Product (Id, VendorId,Name,Msrp,Costprice,Rop, Eoq, Qoh, Qoo, Qrcode, Qrcodetxt)
 VALUES ('30x10', 4,'iPhone 5',400.00,500.00,20,20,40,30,'','');
  INSERT INTO Product (Id, VendorId,Name,Msrp,Costprice,Rop, Eoq, Qoh, Qoo, Qrcode, Qrcodetxt)
 VALUES ('50x30', 5,'iPhone 4',600.00,550.00,20,20,40,30,'','');
  INSERT INTO Product (Id, VendorId,Name,Msrp,Costprice,Rop, Eoq, Qoh, Qoo, Qrcode, Qrcodetxt)
 VALUES ('15x30', 3,'iPhone 11',560.00,530.00,20,20,40,30,'','');