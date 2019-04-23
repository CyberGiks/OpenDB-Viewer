import path from 'path';

import express from 'express';
// import * as electron from 'electron';

const app = express();

app.use(express.static(path.join(__dirname, 'views', 'assets')))

app.get('', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(3010);