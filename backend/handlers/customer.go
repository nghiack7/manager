package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/pkg/services"
	"github.com/pkg/errors"
)

type CustomerHandler interface {
	GetCustomerByPhone(*gin.Context)
	GetCustomerOrders(*gin.Context)
}

type customerHandler struct {
	service services.Service
}

func NewCustomerHandler(service services.Service) CustomerHandler {
	return &customerHandler{service: service}
}

func (h *customerHandler) GetCustomerByPhone(gctx *gin.Context) {
	numberPhone, ok := gctx.GetQuery("number_phone")
	if !ok {
		gctx.AbortWithStatusJSON(http.StatusBadRequest, Response{false, MessageFailedBadRequest, nil})
		return
	}
	customer, err := h.service.GetCustomerInfo(numberPhone)
	if err != nil {
		gctx.AbortWithStatusJSON(http.StatusInternalServerError, Response{false, errors.Wrap(err, MessageFailedDatabase).Error(), nil})
		return
	}
	gctx.JSON(http.StatusOK, Response{true, MessageSuccess, customer})
}

func (h *customerHandler) GetCustomerOrders(gctx *gin.Context) {
	numberPhone, ok := gctx.GetQuery("number_phone")
	if !ok {
		gctx.AbortWithStatusJSON(http.StatusBadRequest, Response{false, MessageFailedBadRequest, nil})
		return
	}
	customer, err := h.service.GetCustomerInfo(numberPhone)
	if err != nil {
		gctx.AbortWithStatusJSON(http.StatusInternalServerError, Response{false, errors.Wrap(err, MessageFailedDatabase).Error(), nil})
		return
	}
	orders, err := h.service.GetOrderByCustomerID(customer.ID)
	if err != nil {
		gctx.AbortWithStatusJSON(http.StatusInternalServerError, Response{false, errors.Wrap(err, MessageFailedDatabase).Error(), nil})
		return
	}
	gctx.JSON(http.StatusOK, Response{true, MessageSuccess, orders})
}
