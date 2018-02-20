const express = require('express');
const csv = require('csvtojson');

const app = express();
const port = process.env.PORT || 3001;

let headers, data, body = [];

csv()
    .fromFile('./titanic.csv')
    .on('header', (header) => headers = header)
    .on('json', (json) => body.push(json))
    .on('done', () => {
        data = body.map((row) => {
            headers.forEach((header) => {
                if (!row[header]) {
                    row[header] = '';
                }
            });
            return row;
        });
    });

app.get('/api/data', (req, res) => {
    res.send(data);
});

app.listen(port, () => console.log(`Listening on port ${port}`));