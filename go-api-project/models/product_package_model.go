package models

type ProductPackage struct {
	ID             int      `json:"id"`
	Name           string   `json:"name"`
	RAM            string   `json:"ram"`
	CPU            string   `json:"cpu"`
	Storage        string   `json:"storage"`
	Price          float64  `json:"price"`
	ID_Product     int      `json:"ID_Product"` // Đảm bảo tên trường
	Hourly         *bool    `json:"hourly"`
	Monthly        *bool    `json:"monthly"`
	Quarterly      *bool    `json:"quarterly"`
	Biannually     *bool    `json:"biannually"`
	Annually       *bool    `json:"annually"`
	Biennially     *bool    `json:"biennially"`
	Triennially    *bool    `json:"triennially"`
	Quinquennially *bool    `json:"quinquennially"`
	Decennially    *bool    `json:"decennially"`
	Content        *string  `json:"content"`
	Thumb          *string  `json:"thumb"`
	Slug           *string  `json:"slug"`
	DataStranfer   *string  `json:"data_stranfer"`
	Bandwidth      *string  `json:"bandwidth"`
	Tax            *float64 `json:"tax"`
}

func (ProductPackage) TableName() string {
	return "productsPackage" // Đảm bảo tên bảng đúng
}
