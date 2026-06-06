const http = require('http');
http.get('http://localhost:3000/admin', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    console.log("Headers:", res.headers);
  });
});
