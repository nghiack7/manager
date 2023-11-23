package repository

import (
	"github.com/nghiack7/manager/pkg/models"
	"gorm.io/gorm"
)

type UserRepository interface{}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *userRepository {
	return &userRepository{db}
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
