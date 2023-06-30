module.exports = (request, response) => {
    let id = request.url.split('/')[3];
    const idUser = request.users.findIndex((user) => {
        return user.id === id
    });

    if (request.url === "/api/users") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(request.users));
        response.end();
    } else if (request.url === `/api/users/${id}`) {
        if (idUser !== -1) {
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            userFilter = request.users.filter((user) => {
                return user.id === id
            });
            response.write(JSON.stringify(userFilter));
            response.end();
        } else {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ title: "Not Found", message: "User not found" }));
        }
    } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
}