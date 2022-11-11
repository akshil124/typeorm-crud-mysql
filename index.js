const express = require("express")
const typeorm = require("typeorm")
const app = express()

const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "crud",
    synchronize: true,
    entities: [require("./entity/User")],
})

app.get("/",(req,res)=>{
    res.send("hiii")
})

dataSource.initialize().then(()=>{
    console.log("initialize")
}).catch((err)=>{
    console.log("err",err)
})

app.listen(5000,()=>{
    console.log("server started")
})