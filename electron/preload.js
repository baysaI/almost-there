const { contextBridge } = require('electron');

const arg = process.argv.find(a => a.startsWith('--at-name='));
contextBridge.exposeInMainWorld('AT', { name: arg ? decodeURIComponent(arg.slice(10)) : '' });
