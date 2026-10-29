const { app, BrowserWindow, Menu, dialog } = require('electron');
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

const TEXT = {
  en: {
    title: 'Almost There',
    message: 'Are you sure you want to open this application?',
    detail: 'It might hurt.',
    yes: 'Yes',
    no: 'No',
    again: 'You already said yes.'
  },
  tr: {
    title: 'Almost There',
    message: 'Bu uygulamayı açmak istediğine emin misin?',
    detail: 'Canın yanabilir.',
    yes: 'Evet',
    no: 'Hayır',
    again: 'Zaten evet dedin.'
  }
};

function warn() {
  const t = app.getLocale().toLowerCase().startsWith('tr') ? TEXT.tr : TEXT.en;
  const answer = dialog.showMessageBoxSync({
    type: 'warning',
    title: t.title,
    message: t.message,
    detail: t.detail,
    buttons: [t.yes, t.no],
    defaultId: 0,
    cancelId: 1,
    noLink: true
  });
  if (answer !== 0) {
    dialog.showMessageBoxSync({ type: 'warning', title: t.title, message: t.again, buttons: [t.yes], noLink: true });
  }
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

app.whenReady().then(() => {
  warn();
  createWindow();
});
app.on('window-all-closed', () => app.quit());
