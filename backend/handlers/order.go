package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/pkg/models"
	"github.com/nghiack7/manager/pkg/services"
)

type OrderHandler interface {
	CreateOrder(c *gin.Context)
	UpdateOrder(c *gin.Context)
}

type orderHandler struct {
	service services.Service
}

func NewOrderHandler(service services.Service) *orderHandler {
	return &orderHandler{service: service}
}

func (h *orderHandler) CreateOrder(gCtx *gin.Context) {
	var req models.Order
	err := gCtx.ShouldBindJSON(&req)
	if err != nil {
		gCtx.AbortWithStatusJSON(400, Response{false, MessageFailedBadRequest, nil})
		return
	}
	customer, err := h.service.GetCustomerByID(req.CustomerID)
	if err != nil {
		gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	err = h.service.CreateOrder(*customer, req)
	if err != nil {
		gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	gCtx.JSON(200, Response{true, MessageSuccess, nil})
}

func (h *orderHandler) UpdateOrder(c *gin.Context) {
	return
}
