const express = require("express")
const typeorm = require("typeorm")
const bodyparser = require("body-parser")
const User = require("./entity/User")
const {createDatabase} = require("typeorm-extension")
const app = express()
app.use(bodyparser())

;(async () => {
    await createDatabase({ifNotExist: true})

//     process.exit(0);
 })();



const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    synchronize: true,
    logging: false,
    entities: [User],
    database: "user",
})

dataSource.initialize().then(()=>{
    console.log("initialize")
}).catch((err)=>{
    console.log("err",err)
})

app.post("/",(req,res)=>{
    console.log("body")

    let postRepository = dataSource.getRepository("User")
    postRepository.save(req.body)
        .then(()=> {
            res.send("data possted")
        }).catch((err) => {
        console.log("err",err)
        res.send(err)
    })
})


app.listen(5000,()=>{
    console.log("server started")
})