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
	Price float64 `json"price"`
}

type Order struct {
	ID        int64     `json:"id"`
	ProductID int64     `json:"id"`
	UserID    int64     `json:"id"`
	Quantity  int64     `json:"quantity"`
	CreateAt  time.Time `json:"create_at"`
}
