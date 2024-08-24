import { Sequelize } from 'sequelize';
import dbconfig from "../config/connectDB.js"

const db = {};
db.sequelize = new Sequelize(dbconfig);

export default db;