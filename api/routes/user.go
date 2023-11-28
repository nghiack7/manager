package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/handlers"
)

func RegisterUserRoute(r *gin.RouterGroup, cHandler handlers.CustomerHandler) {
	route := r.Group("/customers")
	{
		route.GET("/", cHandler.GetListCustomers)
		route.GET("/byphone", cHandler.GetCustomerByPhone)
		route.GET("/info", cHandler.GetCustomerOrders)
		route.POST("/", cHandler.CreateCustomer)
	}
}
