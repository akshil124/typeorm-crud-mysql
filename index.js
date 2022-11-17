const express = require("express")
const typeorm = require("typeorm")
const bodyparser = require("body-parser")
const User = require("./entity/User")
const Hooby = require("./entity/hobby")
const Job = require("./entity/job")
const Education = require("./entity/education")
const {createDatabase} = require("typeorm-extension")
const app = express()
app.use(bodyparser())

;(async () => {
    await createDatabase({ifNotExist: true})
    dataSource.initialize().then(() => {
        console.log("initialize")
    }).catch((err) => {
        console.log("err", err)
    })
//     process.exit(0);
})();


const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "user",
    entities: [User, Hooby, Job, Education],
    synchronize: true,
})

app.post("/adduser", async (req, res) => {
    console.log("body", req.body)
    var hobby = req?.body?.hobby?.map((l) => {
        return {
            name: l
        }
    })
    var User = {
        name: req?.body?.name,
        email: req?.body?.email,
        password: req?.body?.password,
        hobby: hobby,
        job: req?.body?.job,
        education: req?.body?.education,
    }

    let postRepository = dataSource.getRepository("user")
    postRepository.save(User)
        .then(() => {
            res.send("data possted")
        }).catch((err) => {
        res.send(err)
    })

    // or you can use QueryBuilder
    // await dataSource
    //     .createQueryBuilder()
    //     .insert()
    //     .into("user")
    //     .values(User)
    //     .execute().then(() => {
    //         res.send("data posted")
    //     }).catch((err) => {
    //         res.send(err)
    //     })

})

app.get("/getusers", async (req, res) => {
    const user = await dataSource.getRepository("user").find()
    const users = await user?.map((l) => {
        return {
            id: l?.id,
            name: l?.name,
            email: l?.email,
            password: l?.password,
            hobby: l?.hobby?.map((i) => {
                return i?.name
            }),
            job: l?.job,
            education: l?.education
        }
    })
    res.send(users)
})

app.get("/getusers/:id", async (req, res) => {
    const data = await dataSource.getRepository("user").findOneBy({id: req.params.id})
    const user = {
        id: data?.id,
        name: data?.name,
        email: data?.email,
        password: data?.password,
        hobby: data?.hobby?.map((i) => {
            return i?.name
        }),
        job: data?.job,
        education: data?.education
    }
    res.send(user)
})

app.delete("/deleteuser/:id", async (req, res) => {

    const data = await dataSource.getRepository("user").findOneBy({id: req.params.id})

    await dataSource.getRepository("user").delete(req.params.id).then((data) => {
        if (data.affected) {
            res.send("user deleted")
        }
    })
    await dataSource.getRepository("job").delete(data?.job?.id)
    await dataSource.getRepository("education").delete(data?.education?.id)
    data?.hobby.map(async (l) => {
        await dataSource.getRepository("hobby").delete(l?.id)
    })

})

app.put("/updateuser/:id", async (req, res) => {

    const data = await dataSource.getRepository("user").findOneBy({id: req.params.id})

    let user = {
        id: parseInt(req.params.id) || data?.id,
        name: req?.body?.name || data?.name,
        email: req?.body?.email || data?.email,
        password: req?.body?.password || data?.password,
        hobby: req?.body?.hobby?.map((i) => {
            return {name: i}
        }) || data?.hobby,
        job : req?.body?.job || data?.job ,
        education : req?.body?.education || data?.education
    }

    await dataSource.getRepository('user').save(user).then(() => {
        if (Object.keys(req?.body).length !== 0) {
            res.send("user updated")
        } else {
            res.send("nothing update")
        }
    }).catch((err) => {
        console.log("err", err)
    })

    if(req?.body?.job){
        await dataSource.getRepository("job").delete(data?.job?.id)
    }
    if(req?.body?.education){
        await dataSource.getRepository("education").delete(data?.education?.id)
    }
    if (req?.body?.hobby) {
        data?.hobby.map(async (l) => {
            await dataSource.getRepository("hobby").delete(l?.id)
        })
    }

})

app.listen(5000, () => {
    console.log("server started")
})