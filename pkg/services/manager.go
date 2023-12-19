package services

import (
	"errors"
	"strconv"

	"github.com/nghiack7/manager/pkg/models"
	"github.com/nghiack7/manager/pkg/repositories"
	"github.com/nghiack7/manager/utils"
)

// Define smaller service interfaces for specific functionalities
type CustomerService interface {
	GetCustomerByID(id int64) (*models.Customer, error)
	GetCustomerInfo(phoneNumber string) (*models.Customer, error)
	GetCustomerByOrderID(orderID int64) (*models.Customer, error)
	ListCustomers() ([]models.Customer, error)
	CreateCustomer(customer *models.Customer) error
	DeleteCustomer(customerID int64) error
}

type ProductService interface {
	GetProducts() ([]models.Product, error)
	GetProductByName(name string) ([]models.Product, error)
	GetProductByID(int64) (*models.Product, error)
	CreateProduct(product models.Product) error
	UpdateProduct(product models.Product) error
	DeleteProduct(product models.Product) error
}

type OrderService interface {
	CreateOrder(customer models.Customer, order models.Order) error
	GetOrders() ([]models.Order, error)
	GetOrdersByCustomerID(customerID int64) ([]models.Order, error)
	GetOrderItemsByProductID(productID int64) ([]models.OrderItem, error)
	GetCustomersByProductID(productID int64) ([]models.Customer, error)
	GetOrderByOrderItemID(orderItemID int64) (*models.Order, error)
}

// Error definitions
var (
	ErrInvalidPhoneNumber = errors.New("invalid phone number")
	ErrInvalidOrderItems  = errors.New("invalid order items")
)

// Combined service interface that includes all functionalities
type Service interface {
	CustomerService
	ProductService
	OrderService
}

type service struct {
	user    repositories.UserRepository
	order   repositories.OrderRepository
	product repositories.ProductRepository
}

func NewService(userRepo repositories.UserRepository, orderRepo repositories.OrderRepository, productRepo repositories.ProductRepository) Service {
	return &service{
		user:    userRepo,
		order:   orderRepo,
		product: productRepo,
	}
}

func (s *service) CreateOrder(customer models.Customer, order models.Order) error {
	if err := s.validateOrder(order); err != nil {
		return err
	}

	if err := s.order.CreateOrder(order); err != nil {
		return err
	}
	return nil
}

func (s *service) validateOrder(order models.Order) error {
	if order.Items == nil {
		return ErrInvalidOrderItems
	}
	for _, item := range order.Items {
		if item.Quantity == 0 {
			return ErrInvalidOrderItems
		}
	}
	return nil
}

// GetCustomerInfo retrieves customer information based on phone number
func (s *service) GetCustomerInfo(phoneNumber string) (*models.Customer, error) {
	if phoneNumber == "" {
		return nil, ErrInvalidPhoneNumber
	}
	if _, err := strconv.ParseInt(phoneNumber, 10, 64); err != nil {
		return nil, ErrInvalidPhoneNumber
	}

	customer, err := s.user.FindUser(phoneNumber)
	if err != nil {
		return nil, err
	}
	return customer, nil
}

// ListCustomers retrieves a list of all customers
func (s *service) ListCustomers() ([]models.Customer, error) {
	return s.user.GetCustomersList()
}

// CreateCustomer creates a new customer
func (s *service) CreateCustomer(customer *models.Customer) error {
	return s.user.CreateNewUser(customer)
}

// GetCustomerByID retrieves a customer based on ID
func (s *service) GetCustomerByID(id int64) (*models.Customer, error) {
	return s.user.FindUser(id)
}

func (s *service) DeleteCustomer(customerID int64) error {
	return s.user.DeleteUser(customerID)
}

// GetProducts retrieves all products
func (s *service) GetProducts() ([]models.Product, error) {

	products, err := s.product.GetAllProducts()
	if err != nil {
		return nil, err
	}
	for i, product := range products {
		var quantity int64
		orderItems, err := s.GetOrderItemsByProductID(product.ID)
		if err != nil {
			return nil, err
		}
		for _, orderItem := range orderItems {
			quantity += (orderItem.Quantity)
		}
		products[i].Total = utils.CalculateTotal(product.Price, quantity)
	}
	return products, nil
}

// GetProductByName retrieves a product by name
func (s *service) GetProductByName(name string) ([]models.Product, error) {
	products, err := s.product.GetProductByName(name)
	if err != nil {
		return nil, err
	}
	for i, product := range products {
		var quantity int64
		orderItems, err := s.GetOrderItemsByProductID(product.ID)
		if err != nil {
			return nil, err
		}
		for _, orderItem := range orderItems {
			quantity += (orderItem.Quantity)
		}
		products[i].Total = utils.CalculateTotal(product.Price, quantity)
	}
	return products, nil
}

func (s *service) GetProductByID(id int64) (*models.Product, error) {
	return s.product.GetProductByID(id)
}

// GetOrdersByCustomerID retrieves orders by customer ID
func (s *service) GetOrdersByCustomerID(customerID int64) ([]models.Order, error) {
	return s.order.GetOrderByCustomerID(customerID)
}

func (s *service) GetCustomerByOrderID(orderID int64) (*models.Customer, error) {
	return s.user.GetCustomerByOrderID(orderID)
}

// GetOrderItemsByProductID retrieves order items by product ID
func (s *service) GetOrderItemsByProductID(productID int64) ([]models.OrderItem, error) {
	return s.order.GetOrderItemsByProductID(productID)
}
func (s *service) GetOrderByOrderItemID(orderItemID int64) (*models.Order, error) {
	return s.order.GetOrderByOrderItemID(orderItemID)
}

func (s *service) GetOrders() ([]models.Order, error) { return s.order.GetOrders() }

// GetCustomersByProductID retrieves customers by product ID
func (s *service) GetCustomersByProductID(productID int64) ([]models.Customer, error) {
	return s.user.GetCustomersByProductID(productID)
}

// CreateProduct creates a new product
func (s *service) CreateProduct(product models.Product) error {
	return s.product.CreateProduct(product)
}

// UpdateProduct updates an existing product
func (s *service) UpdateProduct(product models.Product) error {
	return s.product.UpdateProduct(product)
}

// DeleteProduct deletes a product
func (s *service) DeleteProduct(product models.Product) error {
	return s.product.DeleteProduct(product)
}
