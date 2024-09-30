package models

type ProductType struct {
	ID           int       `json:"id"`
	Name         string    `json:"name"`
	Descriptions string    `json:"descriptions"`
	Content      string    `json:"content"`
	Thumb        *string   `json:"thumb"`
	Slug         string    `json:"slug"`
	Products     []Product `gorm:"foreignKey:ID_products_types" json:"products"` // Đảm bảo tên khóa ngoại đúng
}

func (ProductType) TableName() string {
	return "products_type" // This will force GORM to use the correct table name
}
