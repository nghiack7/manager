package repositories

import (
	"github.com/nghiack7/manager/pkg/models"
	"gorm.io/gorm"
)

type UserRepository interface {
	CreateNewUser(*models.Customer) error
	FindUser(any) (*models.Customer, error)
	GetCustomersByProductID(int64) ([]models.Customer, error)
	GetCustomerByOrderID(orderID int64) (*models.Customer, error)
	GetCustomersList() ([]models.Customer, error)
	DeleteUser(int64) error
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(opts ...RepoOpts) *userRepository {
	u := &userRepository{}
	for _, opt := range opts {
		opt(u)
	}
	return u
}

func (u *userRepository) CreateNewUser(user *models.Customer) error {
	err := u.db.Save(&user).Error
	if err != nil {
		return err
	}
	return nil
}

func (u *userRepository) FindUser(param any) (*models.Customer, error) {
	var user models.Customer
	switch id := param.(type) {
	case string:
		err := u.db.Where("number_phone=?", id).First(&user).Error
		if err != nil {
			return &user, err
		}
	case int64:
		err := u.db.Where("id=?", id).First(&user).Error
		if err != nil {
			return &user, err
		}
	}
	return &user, nil

}

func (u *userRepository) GetCustomersByProductID(productID int64) ([]models.Customer, error) {
	var customer []models.Customer

	err := u.db.Table("products").
		InnerJoins("JOIN order_items ON products.id = order_items.product_id").
		InnerJoins("JOIN orders ON order_items.order_id = orders.id").
		InnerJoins("JOIN customers ON orders.customer_id = customers.id").
		Where("products.id = ?", productID).
		Select("customers.id, customers.name, customers.gender, customers.number_phone").Distinct("id").
		Find(&customer).Error
	return customer, err
}

func (u *userRepository) GetCustomersList() ([]models.Customer, error) {
	var customers []models.Customer
	err := u.db.Find(&customers).Error
	if err != nil {
		return nil, err
	}
	return customers, nil
}

func (u *userRepository) DeleteUser(userID int64) error {
	err := u.db.Model(models.Customer{}).Where("id=?", userID).Delete(nil).Error
	if err != nil {
		return err
	}
	return nil
}

func (u *userRepository) GetCustomerByOrderID(orderID int64) (*models.Customer, error) {
	var order models.Order
	err := u.db.Where("id = ?", orderID).First(&order).Error
	if err != nil {
		return nil, err
	}
	var customer models.Customer
	err = u.db.Where("id=?", order.CustomerID).First(&customer).Error
	if err != nil {
		return nil, err
	}
	return &customer, nil
}
