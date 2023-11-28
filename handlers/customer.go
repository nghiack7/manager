package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/pkg/models"
	"github.com/nghiack7/manager/pkg/services"
	"github.com/pkg/errors"
)

type CustomerHandler interface {
	GetCustomerByPhone(*gin.Context)
	GetCustomerOrders(*gin.Context)
	CreateCustomer(*gin.Context)
	GetListCustomers(*gin.Context)
}

type customerHandler struct {
	service services.Service
}

func NewCustomerHandler(service services.Service) CustomerHandler {
	return &customerHandler{service: service}
}
func (h *customerHandler) GetListCustomers(gctx *gin.Context) {

	customers, err := h.service.GetListCustomers()
	if err != nil {
		gctx.AbortWithStatusJSON(http.StatusInternalServerError, Response{false, errors.Wrap(err, MessageFailedDatabase).Error(), nil})
		return
	}
	gctx.JSON(http.StatusOK, Response{true, MessageSuccess, customers})
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

func (h *customerHandler) CreateCustomer(gCtx *gin.Context) {
	var customer models.Customer
	err := gCtx.ShouldBindJSON(&customer)
	if err != nil {
		gCtx.AbortWithStatusJSON(http.StatusBadRequest, Response{false, MessageFailedBadRequest, nil})
		return
	}
	err = h.service.CreateCustomer(customer)
	if err != nil {
		gCtx.AbortWithStatusJSON(http.StatusBadRequest, Response{false, MessageFailedDatabase, nil})
		return
	}
	gCtx.JSON(http.StatusOK, Response{true, MessageSuccess, customer})
}
