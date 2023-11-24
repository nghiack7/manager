package api

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/api/routes"
	"github.com/nghiack7/manager/handlers"
)

type f func(s *server)
type Server interface {
}

type server struct {
	http.Server
	cHandler handlers.CustomerHandler
	pHandler handlers.ProductHandler
}

func NewServer(opts ...f) Server {
	router := gin.Default()
	s := newDefaultServer(router, "0.0.0.0:8080")
	for _, opt := range opts {
		opt(s)
	}
	s.registerRoute(router)
	return s
}

func newDefaultServer(r http.Handler, addr string) *server {
	return &server{http.Server{Handler: r, Addr: addr}, nil, nil}
}
func (s *server) WithCustomerHandler(cHandler handlers.CustomerHandler) f {
	return func(s *server) {
		s.cHandler = cHandler
	}
}
func (s *server) WithProductHandler(pHandler handlers.ProductHandler) f {
	return func(s *server) {
		s.pHandler = pHandler
	}
}

func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.ServeHTTP(w, r)
}

func (s *server) Start() error {
	err := s.ListenAndServe()
	if err != nil {
		return err
	}
	return nil
}

func (s *server) Stop(ctx context.Context) error {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()
	return s.Shutdown(ctx)
}

func (s *server) registerRoute(r *gin.Engine) {
	api := r.Group("/api")
	routes.RegisterUserRoute(api, s.cHandler)
	routes.RegisterProductRoute(api, s.pHandler)
}
