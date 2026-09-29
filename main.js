const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } = require('electron');
const path = require('path');

let win, tray, quitting = false;

// منع تشغيل نسختين من التطبيق
if (!app.requestSingleInstanceLock()) app.quit();
app.on('second-instance', showWin);

function showWin() {
  if (!win) return;
  win.show();
  win.focus();
}

function createWindow() {
  win = new BrowserWindow({
    width: 460,
    height: 800,
    backgroundColor: '#0d1117',
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      backgroundThrottling: false // لكي يعمل العدّاد والنافذة مخفية
    }
  });
  win.loadFile('index.html');
  // الإغلاق يخفي النافذة في شريط النظام بدل إنهاء التطبيق
  win.on('close', (e) => {
    if (!quitting) { e.preventDefault(); win.hide(); }
  });
}

const LABELS = {
  ar: { tip: 'عينك عليك', open: 'فتح', login: 'التشغيل مع بدء النظام', quit: 'خروج' },
  en: { tip: 'Eye Reminder', open: 'Open', login: 'Launch at startup', quit: 'Quit' }
};
let lang = app.getLocale().startsWith('ar') ? 'ar' : 'en';

function buildTrayMenu() {
  const L = LABELS[lang];
  tray.setToolTip(L.tip);
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: L.open, click: showWin },
    {
      label: L.login,
      type: 'checkbox',
      checked: app.getLoginItemSettings().openAtLogin,
      click: (i) => app.setLoginItemSettings({ openAtLogin: i.checked })
    },
    { type: 'separator' },
    { label: L.quit, click: () => { quitting = true; app.quit(); } }
  ]));
}

function createTray() {
  tray = new Tray(nativeImage.createFromPath(path.join(__dirname, 'assets', 'icon.png')).resize({ width: 32, height: 32 }));
  tray.on('click', showWin);
  buildTrayMenu();
}

ipcMain.on('lang', (_e, l) => {
  if (LABELS[l]) { lang = l; if (tray) buildTrayMenu(); }
});

ipcMain.on('show', showWin);

app.whenReady().then(() => {
  createWindow();
  createTray();
});
