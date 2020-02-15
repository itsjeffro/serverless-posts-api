const swaggerJSDoc = require("swagger-jsdoc");

module.exports = {

    openapi: "3.0.0",

    info: {
        title: "Posts",
        version: "1.0.0",
        description: "",
    },

    apis: [
        "src/handlers/posts.ts",
    ],

    tags: [
        {
            name: "posts",
            description: ""
        }
    ]

};
