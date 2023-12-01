package models

import "time"

type Customer struct {
	ID          int64  `json:"id" gorm:"uniqueIndex"`
	Name        string `json:"name"`
	Gender      string `json:"gender"`
	NumberPhone string `json:"number_phone" gorm:"uniqueIndex"`
}

type Product struct {
	ID    int64   `json:"id" gorm:"uniqueIndex"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
	Total float64 `json:"total" gorm:"-"`
}

type Order struct {
	ID           int64       `json:"id" gorm:"uniqueIndex"`
	CustomerID   int64       `json:"customer_id"`
	CustomerName string      `json:"customer_name" gorm:"-"`
	Items        []OrderItem `json:"items" gorm:"foreignKey:OrderID"`
	CreatedAt    time.Time   `json:"created_at"`
}
type OrderItem struct {
	ID          int64  `json:"id" gorm:"uniqueIndex"`
	OrderID     int64  `json:"order_id"`
	ProductID   int64  `json:"product_id" gorm:"index:idx_product_id"`
	ProductName string `json:"product_name"`
	Quantity    int64  `json:"quantity"`
}

func (order *Order) TableName() string {
	return "order_tables"
}
