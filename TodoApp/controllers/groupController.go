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
		ID uint
	}
	c.Bind(&body)

	var posts []models.Todo
	initializers.DB.Find(&posts, "group_id = ?", body.ID)
	c.JSON(200, posts)
}

func GroupCreate(c *gin.Context) {

	var body struct {
		Title  string
		UserID uint
	}
	c.Bind(&body)
	group := models.Group{Title: body.Title, UserID: body.UserID}

	result := initializers.DB.Create(&group)
	if result.Error != nil {
		c.Status(400)
		return
	}

	initializers.DB.Find(&groups)
	c.JSON(200, groups)
}

func GroupDelete(c *gin.Context) {
	id := c.Param("id")

	var group models.Group
	initializers.DB.Delete(&group, id)
	initializers.DB.Find(&groups)
	c.JSON(200, groups)
}
