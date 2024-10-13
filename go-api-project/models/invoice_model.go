package models

import "time"

type Invoice struct {
	ID           uint          `gorm:"primaryKey"`
	Name         string        `gorm:"type:varchar(255)"`
	Descriptions string        `gorm:"type:varchar(255)"`
	InvoiceItems []InvoiceItem `gorm:"foreignKey:InvoiceID"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	IDAdmin      uint
	IDUser       uint
	TotalPrice   float64
}
