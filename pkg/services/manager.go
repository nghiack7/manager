package services

import (
	"errors"
	"strconv"

	"github.com/nghiack7/manager/pkg/models"
	"github.com/nghiack7/manager/pkg/repositories"
)

type Service interface {
	CreateOrder(customer models.Customer, order models.Order) error
	GetCustomerInfo(numberPhone string) (*models.Customer, error)
	GetListCustomers() ([]models.Customer, error)
	CreateCustomer(models.Customer) error
	GetCustomerByID(id int64) (*models.Customer, error)
	GetProducts() ([]models.Product, error)
	GetProductsByName(name string) (*models.Product, error)
	GetOrderByCustomerID(customerID int64) ([]models.Order, error)
	GetOrderItemsByProductID(productID int64) ([]models.OrderItem, error)
	GetCustomersByProductID(productID int64) ([]models.Customer, error)
	CreateProduct(models.Product) error
	UpdateProduct(models.Product) error
	DeleteProduct(models.Product) error
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
	if err := s.validateOrder(o); err != nil {
		return err
	}

	// Perform business logic related to creating an order, like saving it to a database
	if err := s.order.CreateOrder(o); err != nil {
		return err
	}
	return nil
}

func (s *service) validateOrder(o models.Order) error {
	// Example: Basic validation checks on the order fields
	if o.Items == nil {
		return errors.New("invalid order items")
	}
	for _, item := range o.Items {
		if item.Quantity == 0 {
			return errors.New("invalid order item quantity")
		}
	}

	return nil // Return nil if the order passes validation
}

func (s *service) GetListCustomers() ([]models.Customer, error) {
	return s.user.GetCustomersList()
}

func (s *service) GetCustomerInfo(phoneNumber string) (*models.Customer, error) {
	//validate numberphone
	if phoneNumber == "" {
		return nil, errors.New("invalid phone number")
	}
	if _, err := strconv.ParseInt(phoneNumber, 64, 10); err != nil {
		return nil, errors.New("invalid phone number")
	}

	// Perform business logic related to getting the customer info, like getting it from a database
	customer, err := s.user.FindUser(phoneNumber)
	if err != nil {
		return nil, err
	}

	return customer, err
}

func (s *service) GetProducts() ([]models.Product, error) {
	return s.product.GetAllProducts()
}

func (s *service) GetProductsByName(name string) (*models.Product, error) {
	return s.product.GetProductByName(name)
}

func (s *service) GetOrderByCustomerID(customerID int64) ([]models.Order, error) {
	return s.order.GetOrderByCustomerID(customerID)
}

func (s *service) GetOrderItemsByProductID(productID int64) ([]models.OrderItem, error) {
	return s.order.GetOrderItemsByProductID(productID)
}

func (s *service) GetCustomersByProductID(productID int64) ([]models.Customer, error) {

	return s.user.GetCustomersByProductID(productID)

}

func (s *service) CreateCustomer(customer models.Customer) error {
	return s.user.CreateNewUser(customer)
}

func (s *service) GetCustomerByID(id int64) (*models.Customer, error) {
	return s.user.FindUser(id)
}

func (s *service) CreateProduct(product models.Product) error {
	return s.product.CreateProduct(product)
}

func (s *service) UpdateProduct(product models.Product) error {
	return s.product.UpdateProduct(product)
}

func (s *service) DeleteProduct(product models.Product) error {
	return s.product.DeleteProduct(product)
}
