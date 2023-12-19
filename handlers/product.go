package handlers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/pkg/models"
	"github.com/nghiack7/manager/pkg/services"
	"github.com/nghiack7/manager/utils"
)

type ProductHandler interface {
	GetProducts(gCtx *gin.Context)
	GetProductByName(gCtx *gin.Context)
	CreateProduct(gCtx *gin.Context)
	UpdateProduct(gCtx *gin.Context)
	DeleteProduct(gCtx *gin.Context)
	GetOrderItemsByProductID(gCtx *gin.Context)
}

type productHandler struct {
	service services.Service
}

func NewProductHandler(service services.Service) ProductHandler {
	return &productHandler{service: service}
}

func (h *productHandler) GetProducts(gCtx *gin.Context) {
	products, err := h.service.GetProducts()
	if err != nil {
		gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	gCtx.JSON(200, Response{true, MessageSuccess, products})
}

func (h *productHandler) GetProductByName(gCtx *gin.Context) {
	name, ok := gCtx.GetQuery("search")
	if !ok {
		gCtx.AbortWithStatusJSON(http.StatusBadRequest, Response{false, MessageFailedBadRequest, nil})
		return
	}
	products, err := h.service.GetProductByName(name)
	if err != nil {
		gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	gCtx.JSON(200, Response{true, MessageSuccess, products})
}

func (h *productHandler) CreateProduct(gCtx *gin.Context) {
	var req models.Product
	err := gCtx.ShouldBindJSON(&req)
	if err != nil {
		gCtx.AbortWithStatusJSON(400, Response{false, MessageFailedBadRequest, nil})
		return
	}
	err = h.service.CreateProduct(req)
	if err != nil {
		gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	gCtx.JSON(200, Response{true, MessageSuccess, nil})
}

func (h *productHandler) UpdateProduct(gCtx *gin.Context) {
	var req models.Product
	id, err := strconv.ParseInt(gCtx.Param("id"), 10, 64)
	if err != nil {
		gCtx.AbortWithStatusJSON(400, Response{false, MessageFailedBadRequest, nil})
		return
	}

	err = gCtx.ShouldBindJSON(&req)
	if err != nil {
		gCtx.AbortWithStatusJSON(400, Response{false, MessageFailedBadRequest, nil})
		return
	}
	req.ID = id
	err = h.service.UpdateProduct(req)
	if err != nil {
		gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	gCtx.JSON(200, Response{true, MessageSuccess, nil})
}
func (h *productHandler) DeleteProduct(gCtx *gin.Context) {
	var req models.Product
	id, err := strconv.ParseInt(gCtx.Param("id"), 10, 64)
	if err != nil {
		gCtx.AbortWithStatusJSON(400, Response{false, MessageFailedBadRequest, nil})
		return
	}

	err = gCtx.ShouldBindJSON(&req)
	if err != nil {
		gCtx.AbortWithStatusJSON(400, Response{false, MessageFailedBadRequest, nil})
		return
	}
	req.ID = id
	err = h.service.DeleteProduct(req)
	if err != nil {
		gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	gCtx.JSON(200, Response{true, MessageSuccess, nil})
}

func (h *productHandler) GetOrderItemsByProductID(gCtx *gin.Context) {
	idStr := gCtx.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		gCtx.AbortWithStatusJSON(400, Response{false, MessageFailedBadRequest, nil})
		return
	}
	product, err := h.service.GetProductByID(id)
	if err != nil {
		gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	orderItems, err := h.service.GetOrderItemsByProductID(id)
	if err != nil {
		gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	type response struct {
		ID           int64     `json:"id"`
		CustomerName string    `json:"customer_name"`
		Total        float64   `json:"total"`
		CreatedAt    time.Time `json:"created_at"`
	}
	var responses []response
	for _, item := range orderItems {
		order, err := h.service.GetOrderByOrderItemID(item.ID)
		if err != nil {
			gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
			return
		}
		customer, err := h.service.GetCustomerByOrderID(order.ID)

		if err != nil {
			gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
			return
		}
		total := utils.CalculateTotal(product.Price, item.Quantity)
		responses = append(responses, response{item.ID, customer.Name, total, order.CreatedAt})
	}
	gCtx.JSON(200, Response{true, MessageSuccess, responses})
}
