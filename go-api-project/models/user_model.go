package models

import (
	"time"
)

type User struct {
	ID          int        `json:"id"`
	Email       string     `gorm:"unique;not null"`
	UserName    string     `gorm:"column:UserName;not null"`           // Sử dụng đúng tên cột
	PhoneNumber string     `gorm:"column:PhoneNumber;unique;not null"` // Sử dụng đúng tên cột
	Pass        string     `gorm:"not null"`
	Token       string     `gorm:"not null"`
	Wallet      float64    `gorm:"null"`
	Credit      float64    `gorm:"null"`
	Address     string     `gorm:"null"`
	VIPuser     string     `gorm:"column:VIPuser;null"`
	Status      bool       `gorm:"null"`
	Timestamp   *time.Time `gorm:"null"`
}

func (User) TableName() string {
	return "Users"
}
