package productdto

type ProductRequest struct {
	Title  string `json:"title" form:"name" gorm:"type: varchar(255)" validate:"required"`
	Image  string `json:"image" form:"image" gorm:"type: varchar(255)"`
	Price  int    `json:"price" form:"price" gorm:"type: varchar(255)" validate:"required"`
	UserID int    `json:"user_id"`
}
