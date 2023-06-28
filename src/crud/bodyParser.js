module.exports = async (request) => {
    return new Promise((resolve, reject) => {
      try {
        let body = "";
        request.on("data", (chunk) => {
          body += chunk;
        });
        request.on("end", () => {
          if (JSON.parse(body)) {
            resolve(JSON.parse(body));
          } else {
            resolve("");
          }
          resolve(JSON.parse(body));
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };