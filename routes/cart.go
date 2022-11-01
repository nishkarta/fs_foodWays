package routes

import (
	"foodways/handlers"
	"foodways/pkg/middleware"
	"foodways/pkg/mysql"
	"foodways/repositories"

	"github.com/gorilla/mux"
)

func CartRoutes(r *mux.Router) {
	cartRepository := repositories.RepositoryCart(mysql.DB)
	h := handlers.HandlerCart(cartRepository)

	r.HandleFunc("/cart/add/{productID}", middleware.Auth(h.AddToCart)).Methods("POST")
	r.HandleFunc("/carts", middleware.Auth(h.GetCartByUserID)).Methods("GET")
	r.HandleFunc("/cart/update/{productID}", middleware.Auth(h.DeleteCartByQty)).Methods("PATCH")
	r.HandleFunc("/cart/delete/{productID}", middleware.Auth(h.DeleteCartByID)).Methods("DELETE")

}
