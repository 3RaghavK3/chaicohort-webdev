import app from './app.js'
import dotenv from 'dotenv'
import connectdb from './db/db.js';


dotenv.config({
    path:"./.env"
})

const port=process.env.PORT||8000;


connectdb()
.then(()=>{
    console.log("Database connected");
    app.listen(port,()=>{
        console.log("Server running  on "+ port)
    })
})
.catch((err)=>{
    console.error("Mongodb connection error ",err)
    process.exit(1)
})

