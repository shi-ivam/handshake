module.exports = ({
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "sqlize",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "url":process.env.DATABASE_URL,
    
    "dialectOptions": {"ssl": {"rejectUnauthorized":false}},
    "dialect": "postgres"
  }
})