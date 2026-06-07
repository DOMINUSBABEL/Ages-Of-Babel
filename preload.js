const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  switchViewMode: (mode) => ipcRenderer.send('switch-view-mode', mode),
  setClickThrough: (enabled) => ipcRenderer.send('set-click-through', enabled),
  triggerSteamAchievement: (id) => ipcRenderer.send('trigger-steam-achievement', id),
  getSteamProfile: () => ipcRenderer.invoke('get-steam-profile'),
  onViewModeSwitched: (callback) => {
    ipcRenderer.on('view-mode-switched', (event, mode) => callback(mode));
  }
});
