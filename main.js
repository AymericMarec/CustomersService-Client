const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        fullscreen: true,
        webPreferences: {
            contextIsolation: true, 
            nodeIntegration: false 
        }
    });

    mainWindow.loadFile('./view/index.html');

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});