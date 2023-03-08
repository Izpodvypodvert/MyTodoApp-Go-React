package main

import (
	"TodoApp/controllers"
	"TodoApp/initializers"
	"TodoApp/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDatabase()
}

func main() {
	r := gin.Default()

	r.Use(cors.Default())

	// Users routes
	r.POST("/signUp", controllers.SignUp)
	r.POST("/login", controllers.Login)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)
	r.GET("/logout", controllers.Logout)

	// TODO routes
	r.POST("/posts", controllers.PostsCreate)
	r.GET("/posts", controllers.PostsIndex)
	r.GET("/posts/:id", controllers.PostsShow)
	r.PUT("/posts/:id", controllers.PostsUpdate)
	r.DELETE("/posts/:id/delete", controllers.PostsDelete)
	r.PATCH("/posts/:id/done", controllers.MarkTodoAsDone)

	// Groups routes
	r.GET("/groups", controllers.GroupIndex)
	r.POST("/group/create", controllers.GroupCreate)
	r.DELETE("/group/delete/:id", controllers.GroupDelete)
	r.PUT("/group/posts", controllers.GetPostsFromGroup)

	r.Run()
}
