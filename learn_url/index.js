const http = require('http');

const server = http.createServer((req, res) => {
    const myUrl = new URL(req.url, 'http://localhost:8000'); // Create URL object
    console.log(myUrl)
    console.log(myUrl.pathname);  // "/about"
    console.log(myUrl.searchParams.get('name'));  // "soumyajit"
    console.log(myUrl.searchParams.get('address'));  // "rajgram"

    res.end('Server is UP');

});

server.listen(8000, () => {
    console.log(`Server is listening at port 8000`);
});
