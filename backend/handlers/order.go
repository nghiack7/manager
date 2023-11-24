package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/pkg/models"
	"github.com/nghiack7/manager/pkg/services"
)

type OrderHandler interface{}

type orderHandler struct {
	service services.Service
}

func NewOrderHandler(service services.Service) *orderHandler {
	return &orderHandler{service: service}
}

func (h *orderHandler) CreateOrder(gCtx *gin.Context) {
	var order models.Order
	err := gCtx.ShouldBindJSON(order)
	if err != nil {
		gCtx.AbortWithStatusJSON(400, Response{false, MessageFailedBadRequest, nil})
		return
	}

}
