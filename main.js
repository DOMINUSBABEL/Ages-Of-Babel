const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

let mainWindow;
let steamClient;

// Intentar inicializar Steamworks API (Usamos 480 como fallback para pruebas de desarrollo)
try {
  const steamworks = require('steamworks.js');
  steamClient = steamworks.init(480); // Reemplazar con el AppID real de Ages of Babel al publicar en Steam
  console.log('✅ Steamworks API inicializada con éxito.');
} catch (e) {
  console.warn('⚠️ No se pudo inicializar Steamworks API. Ejecutando en modo local fuera de Steam.', e.message);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    title: "Ages of Babel",
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextBridge: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// --- COMUNICACIONES IPC DESDE EL FRONTEND (index.html) ---

// 1. Toggled de modo de vista (fullscreen vs widget de barra de tareas)
ipcMain.on('switch-view-mode', (event, mode) => {
  if (!mainWindow) return;

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.bounds;
  const { y: workAreaY, height: workAreaHeight } = primaryDisplay.workArea;

  if (mode === 'widget') {
    // Modo Barra de Tareas (Widget compact de fondo)
    mainWindow.setResizable(true); // permitir reajuste de tamaño antes de setearlo
    mainWindow.setFullScreen(false);
    
    // Configurar bordes y transparencia nativa
    mainWindow.setBounds({
      x: 0,
      y: workAreaY + workAreaHeight - 55, // Justo sobre la barra de tareas
      width: width,
      height: 55
    });

    // En Windows y Linux podemos quitar los marcos y hacerlo transparente
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
    mainWindow.setSkipTaskbar(true); // ocultar de la barra de tareas
    
    // Avisar al frontend
    event.reply('view-mode-switched', 'widget');
  } else {
    // Modo Pantalla Completa clásica
    mainWindow.setAlwaysOnTop(false);
    mainWindow.setSkipTaskbar(false);
    
    // Devolver al centro con tamaño estándar
    mainWindow.setBounds({
      x: Math.floor((width - 1280) / 2),
      y: Math.floor((height - 720) / 2),
      width: 1280,
      height: 720
    });

    event.reply('view-mode-switched', 'fullscreen');
  }
});

// 2. Control de Click-Through (Hacer que los clics del mouse pasen a través de la ventana)
ipcMain.on('set-click-through', (event, enabled) => {
  if (!mainWindow) return;
  
  if (enabled) {
    // Ignorar clics del mouse, permitiendo click-through a los elementos de Windows detrás
    // { forward: true } envía eventos de movimiento pero no consume clics
    mainWindow.setIgnoreMouseEvents(true, { forward: true });
  } else {
    // Volver a capturar los clics del mouse normalmente
    mainWindow.setIgnoreMouseEvents(false);
  }
});

// 3. Sistema de Logros de Steamworks
ipcMain.on('trigger-steam-achievement', (event, achievementId) => {
  if (!steamClient) {
    console.log(`[Modo Local] Logro disparado in-game: ${achievementId}`);
    return;
  }

  try {
    const isUnlocked = steamClient.achievement.isUnlocked(achievementId);
    if (!isUnlocked) {
      steamClient.achievement.activate(achievementId);
      console.log(`🏆 Logro de Steam desbloqueado: ${achievementId}`);
    }
  } catch (err) {
    console.error('Fallo al reportar logro a la API de Steamworks:', err);
  }
});

// 4. Solicitar datos de Steam al iniciar
ipcMain.handle('get-steam-profile', () => {
  if (!steamClient) return { loggedIn: false };
  return {
    loggedIn: true,
    username: steamClient.localUser.getSteamId().toString(), // o nombre del jugador
    screenName: steamClient.localUser.getName()
  };
});
