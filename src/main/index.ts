import path from 'path';
import http from 'http';

import express from 'express';
import { app, BrowserWindow } from 'electron';

// debug only allowed for browserMode for now
const browserMode = true;

//#region Initializing variables
let server: http.Server;
let mainWindow: BrowserWindow;
const exp = express();
exp.set('view engine', 'pug');
exp.set('views', path.join(__dirname, 'views'))
//#endregion

//#region BrowserMode Switch

if (!browserMode) {
    app.on('ready', () => {
        const port = InitializeApp();
        mainWindow = new BrowserWindow({
            show: false
        });
        // write code to remove electron menu
        mainWindow.loadURL('http://localhost:' + port);
        mainWindow.on('ready-to-show', () => {
            mainWindow.show();
        });

        mainWindow.on('closed', () => {
            app.quit();
        });
    });
} else {
    console.log('Server running on port : ' + InitializeApp());
}

//#endregion

/**
 * Initializes the server & returns the associated port
 */
function InitializeApp(): number {
    exp.use(express.static(path.join(__dirname, 'views', 'assets')))

    exp.get('', (req, res, next) => {
        res.render('index');
    });

    const initialPort = 3010;
    let counter = 0;
    do {
        server = exp.listen(initialPort + counter);
        counter++;
    } while (!server.listening)

    return initialPort + counter - 1;
}