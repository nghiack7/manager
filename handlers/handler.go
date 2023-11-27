package handlers

type Response struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

const (
	MessageFailedDatabase   = "error get data from database"
	MessageFailedBadRequest = "request parameters are not valid"
	MessageSuccess          = "successfully response"
)
