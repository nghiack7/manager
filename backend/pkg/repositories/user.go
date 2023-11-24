package repositories

import (
	"github.com/nghiack7/manager/pkg/models"
	"gorm.io/gorm"
)

type UserRepository interface{}

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

func (u *userRepository) CreateNewUser(user models.Customer) error {
	err := u.db.Create(&user).Error
	if err != nil {
		return err
	}
	return nil
}

func (u *userRepository) UpdateUser(user models.Customer) error {
	err := u.db.Save(&user).Error
	if err != nil {
		return err
	}
	return nil
}

func (u *userRepository) FindUser(numberPhone string) (models.Customer, error) {
	var user models.Customer
	err := u.db.Where("number_phone=?", user).First(&user).Error
	if err != nil {
		return user, err
	}
	return user, nil
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
