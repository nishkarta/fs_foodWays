package models

import "time"

type Transaction struct {
	ID        int                 `json:"id" gorm:"primary_key:auto_increment"`
	Status    string              `json:"status"`
	ProductID int                 `json:"-"`
	Product   ProductResponse     `json:"product"`
	Qty       int                 `json:"qty"`
	Price     int                 `json:"price"`
	BuyerID   int                 `json:"-"`
	Buyer     UserProfileResponse `json:"buyer"`
	SellerID  int                 `json:"-"`
	Seller    UserProfileResponse `json:"seller"`
	CreatedAt time.Time           `json:"-"`
	UpdatedAt time.Time           `json:"-"`
}

type TransactionResponse struct {
	ID        int                 `json:"id"`
	BuyerID   int                 `json:"-"`
	Buyer     UserProfileResponse `json:"buyer"`
	SellerID  int                 `json:"-"`
	Seller    UserProfileResponse `json:"seller"`
	Status    string              `json:"status"`
	ProductID int                 `json:"-"`
	Product   ProductResponse     `json:"order"`
	Qty       int                 `json:"qty"`
	Price     int                 `json:"price"`
	// Qty         int               `json:"qty"`
}
type TransactionUserResponse struct {
	ID        int                 `json:"id"`
	BuyerID   int                 `json:"-"`
	Buyer     UserProfileResponse `json:"buyer"`
	SellerID  int                 `json:"-"`
	Seller    UserProfileResponse `json:"seller"`
	Status    string              `json:"status"`
	ProductID int                 `json:"-"`
	Product   ProductResponse     `json:"product"`
	Qty       int                 `json:"qty"`
	Price     int                 `json:"price"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}
func (TransactionUserResponse) TableName() string {
	return "transactions"
}
