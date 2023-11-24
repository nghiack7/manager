package services

import "github.com/nghiack7/manager/pkg/repositories"

type Builder interface{}

type serviceBuilder struct {
	service *service
}

func (builder *serviceBuilder) reset() {
	builder.service = &service{}
}

func (builder *serviceBuilder) setUser(user repositories.UserRepository) {
	if user == nil {
		user = repositories.NewUserRepository()
	}
	builder.service.setUser(user)
}

func (builder *serviceBuilder) setOrder(order repositories.OrderRepository) {
	if order == nil {
		order = repositories.NewOrderRepository()
	}
	builder.service.setOrder(order)
}

func (builder *serviceBuilder) setProduct(product repositories.ProductRepository) {
	if product == nil {
		product = repositories.NewProductRepository()
	}
	builder.service.setProduct(product)
}

func (builder *serviceBuilder) result() Service {
	return builder.service
}
