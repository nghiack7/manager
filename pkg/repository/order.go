package repository

import "gorm.io/gorm"

type OrderRepository interface{}

type orderRepository struct {
	db *gorm.DB
}

func NewOrderRepository(db *gorm.DB) *orderRepository {
	return &orderRepository{db}
}
