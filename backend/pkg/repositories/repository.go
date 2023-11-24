package repositories

import (
	"gorm.io/gorm"
)

type RepoOpts func(any)

func WithDatabase(db *gorm.DB) RepoOpts {
	return func(r any) {
		switch repo := r.(type) {
		case *userRepository:
			repo.db = db
		case *productRepository:
			repo.db = db
		case *orderRepository:
			repo.db = db
		default:
			return
		}
	}
}
