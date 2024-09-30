package models

type Product struct {
	ID                int              `json:"id"`
	Name              string           `json:"name"`
	Descriptions      string           `json:"descriptions"`
	Content           string           `json:"content"`
	Thumb             *string          `json:"thumb"`
	Slug              string           `json:"slug"`
	ID_products_types int              `json:"ID_Products_Types"` // Đảm bảo tên đúng
	Packages          []ProductPackage `gorm:"foreignKey:ID_Product;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Images            []ProductImage   `gorm:"foreignKey:ID_product;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

func (Product) TableName() string {
	return "products" // This will force GORM to use the correct table name
}
