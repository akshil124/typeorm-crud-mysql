const typeorm = require("typeorm")

const User = new typeorm.EntitySchema({
    name: "user",
    tableName: "user",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        email: {
            type: "varchar",
        },
        password: {
            type: "varchar",
        },
    },
    relations: {
        hobby: {
            target: "hobby",
            type: "many-to-many",
            joinTable: true,
            cascade: true,
            eager : true
        },
        job: {
            target: "job",
            type: "one-to-one",
            joinColumn:true,
            cascade: true,
            eager : true
        },
        education: {
            target: "education",
            type: "one-to-one",
            joinColumn:true,
            cascade: true,
            eager : true
        },
    },
})
module.exports = User