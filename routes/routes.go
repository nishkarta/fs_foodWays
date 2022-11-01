package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	UserRoutes(r)
	ProductRoutes(r)
	TransactionRoutes(r)
	CartRoutes(r)

	AuthRoutes(r)
}
