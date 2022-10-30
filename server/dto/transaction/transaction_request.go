package transactiondto

type AddTransactionRequest struct {
	ProductID int `json:"productId" form:"productId" gorm:"type: int"`
	Qty       int `json:"qty" form:"qty" gorm:"type: int"`
	Price     int `json:"price" form:"price"`
	SellerID  int `json:"sellerId"`
}

type UpdateTransactionRequest struct {
	Status    string `json:"status" form:"status" gorm:"type: varchar(255)"`
	ProductID int    `json:"productId" form:"productId" gorm:"type: int"`
	Qty       int    `json:"qty" form:"qty" gorm:"type: int"`
	Price     int    `json:"price" form:"price"`
}
