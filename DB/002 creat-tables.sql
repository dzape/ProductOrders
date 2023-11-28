--DESCRIPTION
-- Creating Tables 

-- Products
BEGIN TRANSACTION IF OBJECT_ID('ProductOrders.dbo.Products') IS NULL BEGIN 
PRINT 'Creating Table Products' CREATE TABLE Products (
	ProductId int identity (1, 1) NOT NULL PRIMARY KEY,
	Name nvarchar(255) NOT NULL,
	Price money NOT NULL,
	Manufacturer nvarchar(255) NOT NULL
) PRINT 'END: Table Products created';
END
ELSE BEGIN PRINT 'Table Products already exists';
IF NOT EXISTS(
	SELECT 1
	FROM Products
	WHERE Name = 'Ball'
) BEGIN PRINT 'BEGIN: Populate table Products';
INSERT INTO Products (Name, Price, Manufacturer)
VALUES ('Ball', 100, 'Spalding')
END
ELSE BEGIN PRINT 'Product Ball already exists.'
END IF NOT EXISTS(
	SELECT 1
	FROM Products
	WHERE Name = 'Shoes'
) BEGIN
INSERT INTO Products (Name, Price, Manufacturer)
VALUES ('Shoes', 100, 'Nike')
END
ELSE BEGIN PRINT 'Product Shoes already exists.'
END IF NOT EXISTS(
	SELECT 1
	FROM Products
	WHERE Name = 'TShirt'
) BEGIN
INSERT INTO Products (Name, Price, Manufacturer)
VALUES ('TShirt', 100, 'Nike') PRINT 'END: Populating table Products';
END
ELSE BEGIN PRINT 'Product TShirt already exists.'
END
END ----------------------------------------------------------------------------------------
-- Orders
IF OBJECT_ID('ProductOrders.dbo.Orders') IS NULL BEGIN PRINT 'Creating Table Orders';
CREATE TABLE Orders (
	OrderId int identity (1, 1) NOT NULL PRIMARY KEY,
	FullName nvarchar(255) NOT NULL,
	Contact nvarchar(255) NOT NULL,
	Address nvarchar(255) NOT NULL,
	OrderDate DATE NOT NULL
) PRINT 'END: Table Orders created';
END
ELSE BEGIN PRINT 'Table Orders already exists';
END ----------------------------------------------------------------------------------------
-- OrderDetails
IF OBJECT_ID('ProductOrders.dbo.OrderDetails') IS NULL BEGIN PRINT 'Creating Table OrderDetails';
CREATE TABLE OrderDetails(
	OrderDetailId int identity (1, 1) NOT NULL PRIMARY KEY,
	ProductId int NOT NULL,
	OrderId int NOT NULL,
	Quantity int NOT NULL DEFAULT 1,
	FOREIGN KEY (ProductId) REFERENCES Products(ProductId),
	FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
) PRINT 'END: Table OrderDetails created';
END
ELSE BEGIN PRINT 'Table OrderDetails already exists';
END IF @@ERROR <> 0 BEGIN ROLLBACK;
PRINT 'Transaction rolled back.';
END
ELSE BEGIN COMMIT;
PRINT 'Transaction committed.';
END;
PRINT 'END: CREATING DATABASE';