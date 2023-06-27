const http = require("http");
const PORT = 3000;

const server = http.createServer((request, response) => {
    
    response.end();
});

server.listen(PORT, ()=> {
    console.log(`Server at port: ${PORT} `);
})

