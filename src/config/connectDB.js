import dotenv from "dotenv"
dotenv.config();

const dbconfig = {
    host: process.env.DB_host,
    username:process.env.DB_username,
    password:process.env.DB_password,
    database:process.env.DB_database,
    dialect:process.env.DB_dialect
};

export default dbconfig;    