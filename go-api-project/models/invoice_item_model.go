package models

import "time"

type InvoiceItem struct {
	ID           uint   `gorm:"primaryKey"`
	Name         string `gorm:"type:varchar(255)"`
	Descriptions string `gorm:"type:varchar(255)"`
	Quantity     int
	NamePackages string `gorm:"type:varchar(255)"`
	Price        float64
	Circle       string `gorm:"type:varchar(255)"`
	NameImage    string `gorm:"type:varchar(255)"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	InvoiceID    uint // Foreign key linking to Invoice
}
