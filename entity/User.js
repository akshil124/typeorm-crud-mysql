const typeorm = require("typeorm")

module.exports = new typeorm.EntitySchema({
    name: "User",
    tableName: "User",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
    },
})