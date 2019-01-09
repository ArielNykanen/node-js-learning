const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<body>');
    res.write('<head><h1>Hello World</h1></head>');
    res.write('<body><form action="/create-user" method="POST"><input type="text" name="userName"><button type="submit">Add User</button></form></body>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.write('<html>');
    res.write('<body>');
    res.write('<head><h1>Hello World</h1></head>');
    res.write('<ul><li>user1</li><li>user2</li><li>user3</li></ul>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (url === "/create-user" && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString().split('=')[1];
    
      // adding text with filesync
    fs.writeFileSync('addedUser.txt', parsedBody);
    console.log(parsedBody);      
    })
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }
});

server.listen(3000);