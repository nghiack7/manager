package models

import "time"

type Customer struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Gender      string `json:"gender"`
	NumberPhone string `json:"number_phone"`
}

type Product struct {
	ID    int64   `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

type Order struct {
	ID         int64       `json:"id"`
	CustomerID int64       `json:"customer_id"`
	Items      []OrderItem `json:"items"`
	CreateAt   time.Time   `json:"created_at"`
}
type OrderItem struct {
	ID        int64 `json:"id"`
	OrderID   int64 `json:"order_id"`
	ProductID int64 `json:"product_id"`
	Quantity  int64 `json:"quantity"`
}
