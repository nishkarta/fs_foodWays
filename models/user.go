package models

import "time"

type User struct {
	ID       int                   `json:"id" gorm:"primary_key:auto_increment"`
	FullName string                `json:"fullName" gorm:"type:varchar(255)"`
	Email    string                `json:"email" gorm:"type: varchar(255)"`
	Password string                `json:"-" gorm:"type: varchar(255)"`
	Gender   string                `json:"gender" gorm:"type:varchar(255)"`
	Phone    string                `json:"phone" gorm:"type:varchar(255)"`
	Role     string                `json:"role" gorm:"type:varchar(255)"`
	Image    string                `json:"image" gorm:"type:varchar(255)"`
	Location string                `json:"location" gorm:"type:varchar(255)"`
	Products []ProductUserResponse `json:"products"`
	// Transactions []TransactionUserResponse `gorm:"foreignKey:BuyerID" json:"-"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type UserProfileResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"fullName"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	Location string `json:"location"`
}

type RestosResponse struct {
	ID                  int                   `json:"-"`
	ProductUserResponse []ProductUserResponse `json:"products"`
}

type BuyerResponse struct {
	ID       int    `id:"id"`
	FullName string `json:"fullName"`
	Location string `json:"location"`
	Email    string `json:"email"`
}
type SellerResponse struct {
	ID       int    `id:"id"`
	FullName string `json:"fullName"`
	Location string `json:"location"`
	Email    string `json:"email"`
}

func (UserProfileResponse) TableName() string {
	return "users"
}

func (BuyerResponse) TableName() string {
	return "users"
}
func (RestosResponse) TableName() string {
	return "users"
}
