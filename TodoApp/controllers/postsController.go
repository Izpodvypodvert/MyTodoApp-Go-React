package controllers

import (
	"TodoApp/initializers"
	"TodoApp/models"
	"github.com/gin-gonic/gin"
)

var todos []models.Todo

func PostsCreate(c *gin.Context) {
	var body struct {
		Text    string `json:"text"`
		GroupID uint   `json:"group_id"`
		UserID  uint   `json:"user_id"`
		Done    bool   `json:"done"`
	}
	c.Bind(&body)

	todo := models.Todo{Text: body.Text, Done: false, GroupID: body.GroupID, UserID: body.UserID}

	result := initializers.DB.Create(&todo)
	if result.Error != nil {
		c.Status(400)
		return
	}

	initializers.DB.Find(&todos, "group_id = ?", body.GroupID)
	c.JSON(200, todos)
}

func PostsIndex(c *gin.Context) {
	initializers.DB.Find(&todos)

	c.JSON(200, todos)

}

func PostsShow(c *gin.Context) {
	id := c.Param("id")

	var todo models.Todo
	initializers.DB.First(&todo, id)
	c.JSON(200, todo)
}

func PostsUpdate(c *gin.Context) {
	id := c.Param("id")
	var body struct {
		Text string
	}
	c.Bind(&body)
	var todo models.Todo
	initializers.DB.First(&todo, id)
	initializers.DB.Model(&todo).Updates(models.Todo{
		Text: body.Text,
	})

	initializers.DB.Find(&todos, "group_id = ?", todo.GroupID)
	c.JSON(200, todos)
}

func PostsDelete(c *gin.Context) {

	id := c.Param("id")

	var todo models.Todo
	initializers.DB.Find(&todo, id)

	groupID := todo.GroupID

	initializers.DB.Delete(&todo, id)

	initializers.DB.Find(&todos, "group_id = ?", groupID)

	c.JSON(200, todos)
}

func MarkTodoAsDone(c *gin.Context) {
	id := c.Param("id")
	var todo models.Todo
	initializers.DB.First(&todo, id)
	initializers.DB.Model(&todo).Update("done", !todo.Done)
	initializers.DB.Save(&todo)

	initializers.DB.Find(&todos, "group_id = ?", todo.GroupID)
	c.JSON(200, todos)
}
