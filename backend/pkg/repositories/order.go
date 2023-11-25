package repositories

import (
	"github.com/nghiack7/manager/pkg/models"
	"gorm.io/gorm"
)

type OrderRepository interface {
	CreateOrder(order models.Order) error
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
