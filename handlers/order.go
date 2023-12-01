package handlers

import (
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/pkg/models"
	"github.com/nghiack7/manager/pkg/services"
)

type OrderHandler interface {
	CreateOrder(c *gin.Context)
	UpdateOrder(c *gin.Context)
	GetOrderByCustomerID(c *gin.Context)
	GetOrders(c *gin.Context)
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
	req.CreatedAt = time.Now()
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
	idparam, _ := strconv.ParseInt(param, 10, 64)

	var ids []int64
	customers, _ := h.service.ListCustomers()
	for _, customer := range customers {
		if idparam == customer.ID {
			ids = append(ids, customer.ID)
		}
	}
	if len(ids) == 0 {
		listID := h.queryNameOrPhone(param)
		if len(listID) == 0 {
			gCtx.AbortWithStatusJSON(400, Response{false, MessageFailedBadRequest, nil})
			return
		} else {
			ids = append(ids, listID...)
		}

	}
	var orders []models.Order
	var wg sync.WaitGroup
	var mu sync.Mutex
	wg.Add(len(ids))
	for _, id := range ids {
		go func(id int64) {
			order, err := h.service.GetOrdersByCustomerID(id)
			if err != nil {
				return
			}
			customer, err := h.service.GetCustomerByID(id)
			if err != nil {
				return
			}
			for i := range order {
				order[i].CustomerName = customer.Name
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

func (h *orderHandler) GetOrders(c *gin.Context) {
	orders, err := h.service.GetOrders()
	if err != nil {
		c.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	for i := range orders {
		customer, err := h.service.GetCustomerByID(orders[i].CustomerID)
		if err != nil {
			c.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
			return
		}
		orders[i].CustomerName = customer.Name
	}

	c.JSON(200, Response{true, MessageSuccess, orders})
}

func (h *orderHandler) queryNameOrPhone(search string) []int64 {
	customers, err := h.service.ListCustomers()
	if err != nil {
		return nil
	}
	var ids []int64
	for _, customer := range customers {
		if strings.Contains(customer.Name, search) || strings.Contains(customer.NumberPhone, search) {
			ids = append(ids, customer.ID)
		}
	}
	return ids
}
