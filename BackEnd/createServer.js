exports.create = () =>
{
    const express = require('express');
    const app = express();
    const server = require('http').Server(app);
    const port = 4000;

    app.get('/', (request, response) =>
    {
        response.sendFile(__dirname + '/client/index.html');
    });

    app.use('/', express.static(__dirname + '/client'));

    server.listen(port, error =>
    {
        if (error) console.error(error);

        console.log(`Server started on Port ${port}`);
    });

    return server;
}
