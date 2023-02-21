package initializers

import (
	"TodoApp/models"
)

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Todo{})
	DB.AutoMigrate(&models.Group{})
}
