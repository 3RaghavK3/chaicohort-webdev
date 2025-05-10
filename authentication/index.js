import express, { urlencoded } from  "express";
import cors from "cors";
import dotenv from "dotenv"
import db from './utils/db.js'
import userroutes from './routes/user.routes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 2000
const baseurl=`${process.env.BASE_URL}:${port}`




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: baseurl,
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Authorization','Content-Type']
}))


app.use((err, req, res, next) => {
  console.error(err);  
  res.status(500).json({ success: false, message: err.message })
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/v1/users",userroutes);

db()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });


