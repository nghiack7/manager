package repositories

import (
	"github.com/nghiack7/manager/pkg/models"
	"gorm.io/gorm"
)

type OrderRepository interface {
	CreateOrder(order models.Order) error
	UpdateOrder(order models.Order) error
	GetOrderByCustomerID(customerID int64) ([]models.Order, error)
	GetOrderItemsByProductID(int64) ([]models.OrderItem, error)
}

type orderRepository struct {
	db *gorm.DB
}

func NewOrderRepository(opts ...RepoOpts) *orderRepository {
	order := &orderRepository{}
	for _, opt := range opts {
		opt(order)
	}
	return order
}

func (repo *orderRepository) CreateOrder(o models.Order) error {
	err := repo.db.Create(&o).Error
	if err != nil {
		return err
	}
	return nil
}

func (repo *orderRepository) UpdateOrder(o models.Order) error {
	err := repo.db.Updates(&o).Error
	if err != nil {
		return err
	}
	return nil
}

func (repo *orderRepository) GetOrderByCustomerID(customerID int64) ([]models.Order, error) {
	var orders []models.Order
	err := repo.db.Where("customer_id = ?", customerID).Find(&orders).Error
	if err != nil {
		return nil, err
	}
	return orders, nil
}

func (repo *orderRepository) GetOrderItemsByProductID(productID int64) ([]models.OrderItem, error) {
	var orderItems []models.OrderItem
	err := repo.db.Where("product_id = ?", productID).Find(&orderItems).Error
	if err != nil {
		return nil, err
	}
	return orderItems, nil
}
