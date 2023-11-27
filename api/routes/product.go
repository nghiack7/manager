package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/handlers"
)

func RegisterProductRoute(r *gin.RouterGroup, pHandler handlers.ProductHandler) {
	r = r.Group("/products")
	{
		r.GET("/", pHandler.GetProductByName)
		r.POST("/", pHandler.CreateProduct)
		r.PUT("/:id", pHandler.UpdateProduct)
		r.DELETE("/:id", pHandler.DeleteProduct)
	}
}
