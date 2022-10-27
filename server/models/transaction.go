package models

import "time"

type Transaction struct {
	ID          int               `json:"id" gorm:"primary_key:auto_increment"`
	Status      string            `json:"status"`
	Qty         int               `json:"qty"`
	OrderID     int               `json:"-"`
	Order       OrderResponse     `json:"order"`
	UserOrderID int               `json:"-"`
	UserOrder   UserOrderResponse `json:"userOrder"`
	CreatedAt   time.Time         `json:"-"`
	UpdatedAt   time.Time         `json:"-"`
}

type TransactionResponse struct {
	ID          int               `json:"id"`
	UserOrderID int               `json:"-"`
	UserOrder   UserOrderResponse `json:"userOrder"`
	Status      string            `json:"status"`
	OrderID     int               `json:"-"`
	Order       OrderResponse     `json:"order"`
	Qty         int               `json:"qty"`
}
type TransactionUserResponse struct {
	ID          int               `json:"id"`
	UserOrderID int               `json:"-"`
	UserOrder   UserOrderResponse `json:"userOrder"`
	Status      string            `json:"status"`
	OrderID     int               `json:"-"`
	Order       OrderResponse     `json:"order"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}
func (TransactionUserResponse) TableName() string {
	return "transactions"
}
