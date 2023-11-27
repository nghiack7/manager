package api

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/nghiack7/manager/api/routes"
	"github.com/nghiack7/manager/handlers"
)

type f func(s *server)
type Server interface {
	Start() error
	Stop(context.Context) error
}

type server struct {
	server   http.Server
	cHandler handlers.CustomerHandler
	pHandler handlers.ProductHandler
	oHandler handlers.OrderHandler
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
	return &server{server: http.Server{Handler: r, Addr: addr}}
}
func WithCustomerHandler(cHandler handlers.CustomerHandler) f {
	return func(s *server) {
		s.cHandler = cHandler
	}
}
func WithProductHandler(pHandler handlers.ProductHandler) f {
	return func(s *server) {
		s.pHandler = pHandler
	}
}

func WithOrderHandler(oHandler handlers.OrderHandler) f {
	return func(s *server) {
		s.oHandler = oHandler
	}
}

func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.ServeHTTP(w, r)
}

func (s *server) Start() error {
	err := s.server.ListenAndServe()
	if err != nil {
		return err
	}
	return nil
}

func (s *server) Stop(ctx context.Context) error {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()
	return s.server.Shutdown(ctx)
}

func (s *server) registerRoute(r *gin.Engine) {
	r.Use(static.Serve("/", static.LocalFile("./views/build", true)))

	api := r.Group("/api")
	routes.RegisterUserRoute(api, s.cHandler)
	routes.RegisterProductRoute(api, s.pHandler)
	routes.RegisterOrderRoute(api, s.oHandler)
}
