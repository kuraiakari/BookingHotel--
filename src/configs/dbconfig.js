import { Sequelize } from "sequelize";
const db = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: false
})

export default db;