package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/pkg/models"
	"github.com/nghiack7/manager/pkg/services"
)

type ProductHandler interface {
	GetProductByName(gCtx *gin.Context)
	CreateProduct(gCtx *gin.Context)
	UpdateProduct(gCtx *gin.Context)
	DeleteProduct(gCtx *gin.Context)
}

type productHandler struct {
	service services.Service
}

func NewProductHandler(service services.Service) ProductHandler {
	return &productHandler{service: service}
}

func (h *productHandler) GetProductByName(gCtx *gin.Context) {
	name, ok := gCtx.GetQuery("name")
	if !ok {
		gCtx.AbortWithStatusJSON(http.StatusBadRequest, Response{false, MessageFailedBadRequest, nil})
		return
	}
	product, err := h.service.GetProductsByName(name)
	if err != nil {
		gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	orderItems, err := h.service.GetOrderItemsByProductID(product.ID)
	if err != nil {
		gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	var revenue float64
	for _, item := range orderItems {
		revenue += float64(item.Quantity) * product.Price
	}
	customers, err := h.service.GetCustomersByProductID(product.ID)
	if err != nil {
		gCtx.AbortWithStatusJSON(500, Response{false, MessageFailedDatabase, nil})
		return
	}
	response := struct {
		Name      string            `json:"name"`
		Revenue   float64           `json:"revenue"`
		Customers []models.Customer `json:"customer"`
	}{
		Name:      product.Name,
		Revenue:   revenue,
		Customers: customers,
	}
	gCtx.JSON(http.StatusOK, Response{true, MessageSuccess, response})
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
