package handlers

import (
	"net/http"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/pkg/models"
	"github.com/nghiack7/manager/pkg/services"
)

type OrderHandler interface {
	CreateOrder(c *gin.Context)
	UpdateOrder(c *gin.Context)
	GetOrderByCustomerID(c *gin.Context)
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

func (h *orderHandler) GetOrderByCustomerID(gCtx *gin.Context) {
	param := gCtx.Query("search")
	if param == "" {
		gCtx.AbortWithStatusJSON(400, Response{false, MessageFailedBadRequest, nil})
		return
	}
	var ids []int64
	customers, _ := h.service.GetListCustomers()
	for _, customer := range customers {
		if strings.Contains(customer.Name, param) || strings.Contains(customer.NumberPhone, param) {
			ids = append(ids, customer.ID)
		}
	}
	if len(ids) == 0 {
		gCtx.AbortWithStatusJSON(400, Response{false, MessageFailedBadRequest, nil})
		return
	}
	var orders []models.Order
	var wg sync.WaitGroup
	var mu sync.Mutex
	wg.Add(len(ids))
	for _, id := range ids {
		go func(id int64) {
			order, err := h.service.GetOrderByCustomerID(id)
			if err != nil {
				return
			}
			mu.Lock()
			orders = append(orders, order...)
			mu.Unlock()
			defer wg.Done()
		}(id)
	}
	wg.Wait()
	gCtx.JSON(http.StatusOK, Response{true, MessageSuccess, orders})
}
