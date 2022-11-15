const typeorm = require("typeorm")

const Hobby = new typeorm.EntitySchema({
    name: "hobby",
    tableName: "hobby",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        }
    },
})
module.exports = Hobby