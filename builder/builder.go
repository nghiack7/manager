package builder

import "gorm.io/gorm"

type Builder struct {
	db *gorm.DB
}
