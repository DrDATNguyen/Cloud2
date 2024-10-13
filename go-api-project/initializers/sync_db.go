package initializers

import "go-api-project/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.ProductType{})
	DB.AutoMigrate(&models.Product{})
	DB.AutoMigrate(&models.ProductPackage{})
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.ProductImage{})
	DB.AutoMigrate(&models.InvoiceItem{})
	DB.AutoMigrate(&models.Invoice{})

}
