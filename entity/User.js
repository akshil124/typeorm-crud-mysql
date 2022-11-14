const typeorm = require("typeorm")

const User = new typeorm.EntitySchema({
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
module.exports = User