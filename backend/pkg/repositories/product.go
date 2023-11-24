package repositories

import "gorm.io/gorm"

type ProductRepository interface{}

type productRepository struct {
	db *gorm.DB
}

func NewProductRepository(opts ...RepoOpts) *productRepository {
	p := &productRepository{}
	for _, opt := range opts {
		opt(p)
	}
	return p
}
