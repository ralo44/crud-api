const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const bodyParser = require('./bodyParser.js');

module.exports = async (request, response) => {
    if (request.url === "/api/users") {
        let body = await bodyParser(request);

        body.id = crypto.randomUUID();
        request.users.push(body);
        fs.writeFileSync(
            path.join(__dirname, "..", "data", "users.json"),
            JSON.stringify(request.users),
            "utf-8"
        );
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end();
    } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
}