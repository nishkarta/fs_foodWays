package usersdto

type UserResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"fullName" form:"name" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Phone    string `json:"phone" form:"phone" validate:"required"`
	Location string `json:"location" form:"location" validate:"required"`
	Image    string `json:"image" form:"image"`
	Role     string `json:"role" form:"role" validate:"required"`
	Gender   string `json:"-" form:"gender" validate:"required"`
	Password string `json:"-" form:"password" validate:"required"`
}
