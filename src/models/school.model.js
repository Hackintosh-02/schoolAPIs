import { DataTypes } from "sequelize";
import db from "./index.js";

// id (Primary Key)
// name (VARCHAR)
// address (VARCHAR)
// latitude (FLOAT)
// longitude (FLOAT)
const School = db.sequelize.define(
    "schools",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

export default School;