package controllers

import (
	"TodoApp/initializers"
	"TodoApp/models"
	"github.com/gin-gonic/gin"
)

var groups []models.Group

func GroupIndex(c *gin.Context) {
	initializers.DB.Find(&groups)
	c.JSON(200, groups)
}

func GetPostsFromGroup(c *gin.Context) {
	var body struct {
		ID     uint
		UserID uint `json:"user_id"`
	}
	c.Bind(&body)
	var posts []models.Todo
	initializers.DB.Find(&posts, "group_id = ? AND user_id = ?", body.ID, body.UserID)
	c.JSON(200, posts)
}

func GetGroups(c *gin.Context) {
	var body struct {
		UserID uint `json:"user_id"`
	}
	c.Bind(&body)
	var groups []models.Group
	initializers.DB.Find(&groups, "user_id = ?", body.UserID)
	c.JSON(200, groups)
}

func GroupCreate(c *gin.Context) {

	var body struct {
		Title  string
		UserID uint `json:"user_id"`
	}
	c.Bind(&body)
	group := models.Group{Title: body.Title, UserID: body.UserID}

	result := initializers.DB.Create(&group)
	if result.Error != nil {
		c.Status(400)
		return
	}

	initializers.DB.Find(&groups, "user_id = ?", body.UserID)
	c.JSON(200, groups)
}

func GroupDelete(c *gin.Context) {
	id := c.Param("id")

	var group models.Group
	UserID := group.UserID
	initializers.DB.Delete(&group, id)
	initializers.DB.Find(&groups, "user_id = ?", UserID)
	c.JSON(200, groups)
}
