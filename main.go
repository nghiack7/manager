package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"os/signal"

	"github.com/nghiack7/manager/api"
	"github.com/nghiack7/manager/handlers"
	"github.com/nghiack7/manager/pkg/config"
	"github.com/nghiack7/manager/pkg/db"
	"github.com/nghiack7/manager/pkg/logger"
	"github.com/nghiack7/manager/pkg/repositories"
	"github.com/nghiack7/manager/pkg/services"
)

func main() {
	f := func() string {
		flag.Usage = usage
		env := flag.String("env", "dev", `Sets run environment. Possible values are "dev" and "prod"`)
		flag.Parse()
		logger.ConfigureLogger(*env)
		if *env == "prod" {
			logger.SetGinLogToFile()
		}
		return *env
	}
	env := f()
	conf := config.NewConfig(env)
	dbInstance, err := db.InitDatabase(conf)
	if err != nil {
		panic(err)
	}
	if dbInstance == nil {
		panic("failed to initialize database")
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

	server.Start(conf)

	waitForShutdown(server)
}

func waitForShutdown(server api.Server) {
	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan, os.Interrupt)
	<-signalChan
	server.Stop(context.Background())
}

func usage() {
	fmt.Print(`This program runs Manager backend server.

Usage:

 [arguments]

Supported arguments:

`)
	flag.PrintDefaults()
	os.Exit(1)
}
