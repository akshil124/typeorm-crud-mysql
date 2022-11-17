const typeorm = require("typeorm")

const Education = new typeorm.EntitySchema({
    name: "education",
    tableName: "education",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        degree : {
            type: "varchar",
        },
        from : {
            type : "varchar"
        },
        year :{
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

module.exports = Education