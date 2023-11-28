-- DESCRIPTION
-- Creating Database

PRINT 'BEGIN: CREATING DATABASE' IF NOT EXISTS(
	SELECT 1
	FROM master.dbo.sysdatabases
	WHERE name = 'ProductOrders'
) BEGIN CREATE DATABASE ProductOrders
END
ELSE 
BEGIN PRINT 'Database already exists.'
END