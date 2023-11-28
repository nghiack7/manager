package repositories

import (
	"github.com/nghiack7/manager/pkg/models"
	"gorm.io/gorm"
)

type ProductRepository interface {
	CreateProduct(models.Product) error
	UpdateProduct(models.Product) error
	DeleteProduct(models.Product) error
	GetAllProducts() ([]models.Product, error)
	GetProductByName(string) (*models.Product, error)
}

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

func (p *productRepository) CreateProduct(product models.Product) error {
	err := p.db.Create(&product).Error
	if err != nil {
		return err
	}
	return nil
}

func (p *productRepository) UpdateProduct(product models.Product) error {
	err := p.db.Save(&product).Error
	if err != nil {
		return err
	}
	return nil
}

func (p *productRepository) DeleteProduct(product models.Product) error {
	err := p.db.Delete(&product).Error
	if err != nil {
		return err
	}
	return nil
}

func (p *productRepository) GetAllProducts() ([]models.Product, error) {
	var products []models.Product
	err := p.db.Find(&products).Error
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (p *productRepository) GetProductByName(name string) (*models.Product, error) {
	var prod models.Product
	err := p.db.Where("name=?", name).First(&prod).Error
	if err != nil {
		return nil, err
	}
	return &prod, nil
}
