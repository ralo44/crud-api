const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const bodyParser = require('./bodyParser.js');

module.exports = async (request, response) => {

    const id = request.url.split('/')[3];

    if (request.url === `/api/users/${id}`) {
        let body = await bodyParser(request);
        const idUser = request.users.findIndex((user) => {
            return user.id === id
        });

        if (idUser !== -1) {
            request.users[idUser] = { id, ...body };

            fs.writeFileSync(
                path.join(__dirname, "..", "data", "users.json"),
                JSON.stringify(request.users),
                "utf-8"
            );
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(request.users));
        } else {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ title: "Not Found", message: "User not found" }));
        }
    } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
}