module.exports = {

    default: process.env.DB_CONNECTION || "mysql",

    connections: {

        mysql: {
            driver: "mysql2",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }

    }

};