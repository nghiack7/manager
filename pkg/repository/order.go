package repository

import "gorm.io/gorm"

type OrderRepository interface{}

type orderRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *userRepository {
	return &userRepository{db}
}
