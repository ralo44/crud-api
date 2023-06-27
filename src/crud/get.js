module.exports = (request, response) => {
    if (request.url === "/api/users") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(request.users));
        response.end();
    } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
}