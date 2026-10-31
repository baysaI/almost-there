const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const os = require('os');

function pickName(u) {
  const first = String(u || '').trim().split(/[\s._-]+/)[0] || '';
  if (!/^[A-Za-zÇĞİÖŞÜçğıöşü]{2,12}$/.test(first)) return '';
  if (/^(users?|admin|administrator|owner|guest|pc|desktop|laptop|windows|default|test|home|kullan[ıi]c[ıi]|misafir|y[öo]netici|sahip|asus|lenovo|dell|hp|acer|msi|monster|casper|toshiba|samsung|huawei|excalibur)$/i.test(first)) return '';
  return first[0].toUpperCase() + first.slice(1).toLowerCase();
}

function playerName() {
  try { return pickName(os.userInfo().username); } catch (_) { return ''; }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 500,
    show: false,
    backgroundColor: '#060607',
    title: 'Almost There',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
      additionalArguments: ['--at-name=' + encodeURIComponent(playerName())]
    }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, '..', 'web', 'index.html'));
  win.once('ready-to-show', () => win.show());
  win.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') {
      win.setFullScreen(!win.isFullScreen());
      event.preventDefault();
    }
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
