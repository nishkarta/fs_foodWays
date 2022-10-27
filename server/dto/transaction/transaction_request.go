package transactiondto

type AddTransactionRequest struct {
	Status  string `json:"status" form:"status" gorm:"type: varchar(255)"`
	OrderID int    `json:"order_id" form:"order_id" gorm:"type: int"`
	Qty     int    `json:"qty" form:"qty" gorm:"type: int"`
}

type UpdateTransactionRequest struct {
	Status  string `json:"status" form:"status" gorm:"type: varchar(255)"`
	OrderID int    `json:"order_id" form:"order_id" gorm:"type: int"`
	Qty     int    `json:"qty" form:"qty" gorm:"type: int"`
}
