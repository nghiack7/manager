package repositories

import "gorm.io/gorm"

type OrderOpts func(*orderRepository)

type OrderRepository interface{}

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
