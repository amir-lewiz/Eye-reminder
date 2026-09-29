const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', {
  show: () => ipcRenderer.send('show'),
  setLang: (l) => ipcRenderer.send('lang', l)
});
