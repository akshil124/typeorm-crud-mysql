const typeorm = require("typeorm")

const Job = new typeorm.EntitySchema({
    name: "job",
    tableName: "job",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        workplace: {
            type: "varchar",
        },
        salary : {
            type : "varchar"
        },
        designation:{
            type : "varchar"
        }
    },
    relations: {
        user: {
            target: 'user',
            type: 'one-to-one',
        },
    },
})

module.exports = Job