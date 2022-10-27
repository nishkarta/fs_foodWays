package models

import "time"

type Product struct {
	ID        int                 `json:"id"  gorm:"primary_key:auto_increment"`
	Title     string              `json:"title" gorm:"type: varchar(255)"`
	Image     string              `json:"image" gorm:"type: varchar(255)"`
	Price     int                 `json:"price" gorm:"type:int"`
	Stock     int                 `json:"-" form:"stock"`
	UserID    int                 `json:"-"`
	User      UserProfileResponse `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	CreatedAt time.Time           `json:"-"`
	UpdatedAt time.Time           `json:"-"`
}
type ProductResponse struct {
	ID     int                 `json:"id"`
	Title  string              `json:"title"`
	Image  string              `json:"image"`
	Price  int                 `json:"price"`
	Stock  int                 `json:"-" form:"stock"`
	UserID int                 `json:"-"`
	User   UserProfileResponse `json:"user"`
}

type ProductUserResponse struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Image  string `json:"image"`
	Price  int    `json:"price"`
	Stock  int    `json:"-"`
	UserID int    `json:"-"`
}

type OrderResponse struct {
	ID          int               `json:"id"`
	Title       string            `json:"title"`
	Image       string            `json:"image"`
	Stock       int               `json:"stock"`
	UserOrderID int               `json:"-"`
	UserOrder   UserOrderResponse `json:"-"`
}

func (ProductResponse) TableName() string {
	return "products"
}
func (ProductUserResponse) TableName() string {
	return "products"
}

func (OrderResponse) TableName() string {
	return "products"
}
