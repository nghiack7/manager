package repository

import "gorm.io/gorm"

type ProductRepository interface{}

type productRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) *productRepository {
	return &productRepository{db}
}
