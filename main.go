package main

import (
	"github.com/nghiack7/manager/pkg/db"
)

func main() {
	db, err := db.InitDatabase()
	if err != nil {
		panic(err)
	}
	
}
