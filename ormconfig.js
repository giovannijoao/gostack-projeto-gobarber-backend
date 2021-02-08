module.exports = [{
  "name": "default",
  "type": "postgres",
  "host": process.env.APP_DATABASE_POSTGRES_HOST || "localhost",
  "port": process.env.APP_DATABASE_POSTGRES_PORT || 5432,
  "username": process.env.APP_DATABASE_POSTGRES_USERNAME || "postgres",
  "password": process.env.APP_DATABASE_POSTGRES_PASSWORD || "docker",
  "database": process.env.APP_DATABASE_POSTGRES_DATABASE || "gostack_gobarber",
  "entities": [
    "dist/modules/**/infra/typeorm/entities/*.js"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}, {
  "name": "mongo",
  "type": "mongodb",
  "host": process.env.APP_DATABASE_MONGODB_HOST || "172.17.0.3",
  "port": process.env.APP_DATABASE_MONGODB_PORT || 27017,
  "database": process.env.APP_DATABASE_MONGODB_DATABASE || "gostack_gobarber",
  "entities": [
    "./src/modules/**/infra/typeorm/schemas/*.ts"
  ],
  "useUnifiedTopology": true
}]
