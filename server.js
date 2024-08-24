import express from "express"
import connectDB from "./src/config/connectDB.js"
import db from "./src/models/index.js";
import schoolRoutes from "./src/routes/schoolRoutes.js";


const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api',schoolRoutes);

app.listen(PORT, () => {
    console.log(`server running : ${PORT}`);
    db.sequelize.sync();
})