const http = require('http');

const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Example app listening on ${port}`);
});

// const server = http.createServer((req, res) => {
//     console.log(req);
// });

// server.listen(3000);