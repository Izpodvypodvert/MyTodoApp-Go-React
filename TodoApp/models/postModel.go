package models

import "gorm.io/gorm"

type Todo struct {
	gorm.Model
	Done    bool   `json:"done"`
	Text    string `json:"text"`
	GroupID uint   `json:"group_id""`
	UserID  uint   `json:"user_id""`
}
