-- DESCRIPTION
-- Inserting values into Table Products
USE ProductOrders BEGIN TRANSACTION IF NOT EXISTS(
	SELECT 1
	FROM Products
	WHERE Name = 'Ball'
) BEGIN PRINT 'BEGIN: Insert data table Products';
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
VALUES ('TShirt', 100, 'Nike')
END
ELSE BEGIN PRINT 'Product TShirt already exists.'
END IF @@ERROR <> 0 BEGIN ROLLBACK;
PRINT 'Transaction rolled back.';
END
ELSE BEGIN COMMIT;
PRINT 'Transaction committed.';
END;
PRINT 'END: Insert data in Products';