const http = require('http');
http.get('http://localhost:3000/sign-in', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    if (res.statusCode >= 400) console.log("Data:", data.substring(0, 500));
  });
});
