package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/handlers"
)

func RegisterOrderRoute(r *gin.RouterGroup, order handlers.OrderHandler) {
	r = r.Group("/orders")
	{
		r.POST("/", order.CreateOrder)

	}
}
