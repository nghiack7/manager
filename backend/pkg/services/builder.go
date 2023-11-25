package services

import (
	"github.com/nghiack7/manager/pkg/repositories"
)

type ServiceBuilder struct {
	userRepo    repositories.UserRepository
	productRepo repositories.ProductRepository
	orderRepo   repositories.OrderRepository
}

func NewServiceBuilder() *ServiceBuilder {
	return &ServiceBuilder{}
}

func (sb *ServiceBuilder) WithUserRepository(repo repositories.UserRepository) *ServiceBuilder {
	sb.userRepo = repo
	return sb
}

func (sb *ServiceBuilder) WithProductRepository(repo repositories.ProductRepository) *ServiceBuilder {
	sb.productRepo = repo
	return sb
}

func (sb *ServiceBuilder) WithOrderRepository(repo repositories.OrderRepository) *ServiceBuilder {
	sb.orderRepo = repo
	return sb
}

func (sb *ServiceBuilder) Build() Service {
	return &service{
		user:    sb.userRepo,
		product: sb.productRepo,
		order:   sb.orderRepo,
	}
}
