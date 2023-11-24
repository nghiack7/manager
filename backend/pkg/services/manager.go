package services

import (
	"github.com/nghiack7/manager/pkg/models"
	"github.com/nghiack7/manager/pkg/repositories"
)

type Service interface {
	CreateOrder(customer models.Customer, order models.Order) error
	GetCustomerInfo(numberPhone string) (*models.Customer, error)
	CreateCustomer(models.Customer) error
	GetCustomerByID(id int64) (*models.Customer, error)
	GetProducts() ([]models.Product, error)
	GetProductsByName(name string) (*models.Product, error)
	GetOrderByCustomerID(customerID int64) ([]models.Order, error)
	GetOrderItemsByProductID(productID int64) ([]models.OrderItem, error)
	GetCustomersByProductID(productID int64) ([]models.Customer, error)
}

type service struct {
	user    repositories.UserRepository
	order   repositories.OrderRepository
	product repositories.ProductRepository
}

func NewService() Service {
	return &service{}
}

func (s *service) setUser(user repositories.UserRepository) { s.user = user }

func (s *service) setOrder(order repositories.OrderRepository) { s.order = order }

func (s *service) setProduct(product repositories.ProductRepository) { s.product = product }

func (s *service) CreateOrder(c models.Customer, o models.Order) error {
	return nil
}

func (s *service) GetCustomerInfo(phoneNumber string) (*models.Customer, error) {
	return nil, nil
}

func (s *service) GetProducts() ([]models.Product, error) {
	return nil, nil
}

func (s *service) GetProductsByName(name string) (*models.Product, error) {
	return nil, nil
}

func (s *service) GetOrderByCustomerID(customerID int64) ([]models.Order, error) {
	return nil, nil
}

func (s *service) GetOrderItemsByProductID(productID int64) ([]models.OrderItem, error) {
	return nil, nil
}

func (s *service) GetCustomersByProductID(productID int64) ([]models.Customer, error) {

	return nil, nil

}

func (s *service) CreateCustomer(models.Customer) error {
	return nil
}

func (s *service) GetCustomerByID(id int64) (*models.Customer, error) {
	return nil, nil
}
