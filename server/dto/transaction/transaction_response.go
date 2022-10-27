package transactiondto

type TransactionResponse struct {
	ID          int    `json:"id"`
	Qty         int    `json:"qty"`
	UserOrderID int    `json:"user_order_id"`
	Status      string `json:"status"`
	OrderID     int    `json:"product_order_id"`
}
