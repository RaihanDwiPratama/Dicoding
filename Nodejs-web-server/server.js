const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');

    response.statusCode = 200;

    const {method, url} = request;

    // url untuk homepage
    if(url === '/') {
        // jika metode get dipakai, maka akan menampilkan ini adalah homepage.
        if(method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Ini adalah homepage',
            }));
        }
        // jika metode yang dipakai selain get, maka akan menampilkan output dibawah ini.
        else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
        }
    } 
    // url untuk about
    else if(url === '/about') {
        // jika metode get dipakai, maka akan menampilkan ini adalah halaman about
        if(method === 'GET') {
            response.statusCode = 200
            response.end(JSON.stringify({
                message: 'Halo! Ini adalah halaman about',
            }));
        }
        // jika metode post dipakai, maka akan menampilkan data name pada body
        else if(method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                response.end(JSON.stringify({
                    message: `Halo! ${name}! Ini adalah halaman about`,
                }));
            });
        }
        else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
        }
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});