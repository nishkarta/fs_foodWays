package models

type Cart struct {
	ID        int             `json:"id" gorm:"primary_key:auto_increment"`
	ProductID int             `json:"product_id" gorm:"type: int"`
	Products  ProductResponse `json:"product" gorm:"foreignKey:product_id;references:ID;constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	// Products []ProductResponse   `json:"product" gorm:"many2many:product_cart"`
	UsersID int                 `json:"user_id"`
	Users   UserProfileResponse `json:"user" gorm:"constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	Qty     int                 `json:"qty" form:"qty"`
	Price   int                 `json:"price" form:"price"`
}

type CartResponse struct {
	ID       int                 `json:"id"`
	User     UserProfileResponse `json:"user"`
	Products ProductResponse     `json:"products"`
	Qty      int                 `json:"qty"`
	Price    int                 `json:"price"`
}

func (CartResponse) TableName() string {
	return "carts"
}
