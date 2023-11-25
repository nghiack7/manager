package main

import (
	"context"
	"os"
	"os/signal"

	"github.com/nghiack7/manager/api"
	"github.com/nghiack7/manager/handlers"
	"github.com/nghiack7/manager/pkg/db"
	"github.com/nghiack7/manager/pkg/repositories"
	"github.com/nghiack7/manager/pkg/services"
)

func main() {
	dbInstance, err := db.InitDatabase()
	if err != nil {
		panic(err)
	}

	userRepo := repositories.NewUserRepository(repositories.WithDatabase(dbInstance))
	productRepo := repositories.NewProductRepository(repositories.WithDatabase(dbInstance))
	orderRepo := repositories.NewOrderRepository(repositories.WithDatabase(dbInstance))

	service := services.NewServiceBuilder().
		WithUserRepository(userRepo).
		WithProductRepository(productRepo).
		WithOrderRepository(orderRepo).
		Build()

	customerHandler := handlers.NewCustomerHandler(service)
	productHandler := handlers.NewProductHandler(service)
	orderHandler := handlers.NewOrderHandler(service)

	server := api.NewServer(
		api.WithCustomerHandler(customerHandler),
		api.WithProductHandler(productHandler),
		api.WithOrderHandler(orderHandler),
	)

	server.Start()

	waitForShutdown(server)
}

func waitForShutdown(server api.Server) {
	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan, os.Interrupt)
	<-signalChan
	server.Stop(context.Background())
}
