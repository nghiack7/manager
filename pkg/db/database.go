package db

import (
	"fmt"
	"sync"
	"time"

	"bitbucket.org/liamstask/goose/lib/goose"
	"github.com/nghiack7/manager/pkg/config"
	"github.com/opentracing/opentracing-go/log"
	"gorm.io/driver/sqlite" // Sqlite driver based on CGO

	// "github.com/glebarez/sqlite" // Pure go SQLite driver, checkout https://github.com/glebarez/sqlite for details
	"gorm.io/gorm"
)

type f func()

func InitDatabase(conf config.Config) (*gorm.DB, error) {

	var (
		one sync.Once
		db  *gorm.DB
		err error
	)
	var initSqlite f
	initSqlite = func() {
		migrateConf := &goose.DBConf{
			MigrationsDir: "pkg/migrations",
			Env:           "production",
			Driver:        chooseDBDriver("sqlite", conf.DbName),
		}
		// Get the latest possible migration
		latest, err := goose.GetMostRecentDBVersion(migrateConf.MigrationsDir)
		if err != nil {
			log.Error(err)
			return
		}
		i := 0
		for {
			db, err = gorm.Open(sqlite.Open(conf.DbName), &gorm.Config{})
			if err == nil {
				break
			}
			if err != nil && i >= 5 {
				log.Error(err)
				return
			}
			i += 1
			fmt.Println("waiting for database to be up...")
			time.Sleep(2 * time.Second)
		}
		// Migrate up to the latest version
		sql, _ := db.DB()
		err = goose.RunMigrationsOnDb(migrateConf, migrateConf.MigrationsDir, latest, sql)
		if err != nil {
			log.Error(err)
			return
		}

	}
	one.Do(initSqlite)
	return db, err

}

func chooseDBDriver(name, openStr string) goose.DBDriver {
	d := goose.DBDriver{Name: name, OpenStr: openStr}

	switch name {
	case "mysql":
		d.Import = "github.com/go-sql-driver/mysql"
		d.Dialect = &goose.MySqlDialect{}

	// Default database is sqlite3
	default:
		d.Import = "github.com/mattn/go-sqlite3"
		d.Dialect = &goose.Sqlite3Dialect{}
	}

	return d
}
