package transactiondto

import (
	"foodways/models"
	"time"
)

type TransactionResponse struct {
	ID      int                    `json:"id" gorm:"primary_key:auto_increment"`
	Product models.ProductResponse `json:"product" gorm:"foreignKey:ProductID"`
	// BuyerID   int                  			`json:"buyer_id"`
	Buyer models.UserProfileResponse `json:"buyer"`
	// SellerID  int                  			`json:"seller_id"`
	Seller    models.UserProfileResponse `json:"seller"`
	Price     int                        `json:"price"`
	Qty       int                        `json:"qty"`
	Status    string                     `json:"status"  gorm:"type:varchar(25)"`
	CreatedAt time.Time                  `json:"-"`
	UpdatedAt time.Time                  `json:"-"`
}
