package models

import "gorm.io/gorm"

type Group struct {
	gorm.Model
	Title  string
	Todos  []Todo
	UserID uint
}
