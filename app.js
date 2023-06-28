const http = require("http");
require("dotenv").config();

const getMethod = require("./src/crud/get.js");
const postMethod = require("./src/crud/post.js");
const deleteMethod = require("./src/crud/delete.js");
let users = require("./src/data/users.json");

const PORT = process.env.PORT;

const server = http.createServer((request, response) => {
    request.users = users;

    switch (request.method) {
        case "GET":
            getMethod(request, response);
            break;
        case "POST":
            postMethod(request, response);
            break;
        case "DELETE":
            deleteMethod(request, response);
            break;
        default:
            response.statusCode = 500;
            response.setHeader("Content-Type", "application/json");
            response.write(
                JSON.stringify({ title: "Not Found", message: "Request not found" })
            );
            response.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server at port: ${PORT} `);
})

