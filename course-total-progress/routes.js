const fs = require('fs');
const requestHandler = (req, res) => {
  const method = req.method;
  const url = req.url;
  if (url === '/') {
    res.write(
      `<html>
      <body>
      <form action="/message" method="POST">
      <input name="message" type="text">
      <button type="submit">Submit Message</button>
      </form>
      </body>
      </html>`
    );
  return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('test.txt', message);
    });
    res.write(
      `<html>
      <body>
      <h1>hello</h1>
      </body>
      </html>`
      );
    return res.end();
  }
}

module.exports = requestHandler;
