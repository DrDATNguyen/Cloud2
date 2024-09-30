package models

type ProductImage struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Descriptions string `json:"descriptions"`
	Thumb        string `json:"thumb"` // Sửa lại 'Thump' thành 'Thumb' cho nhất quán
	Type         string `json:"type"`
	Content      string `json:"content"`
	Slug         string `json:"slug"`
	ID_product   int    `json:"ID_product"` // Đảm bảo trường này tương ứng với bảng
}

func (ProductImage) TableName() string {
	return "product_image" // This will force GORM to use the correct table name
}
