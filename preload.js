const { contextBridge } = require('electron');

require('dotenv').config();

contextBridge.exposeInMainWorld('env', {
    TABLE_ID: process.env.TABLE_ID
});
