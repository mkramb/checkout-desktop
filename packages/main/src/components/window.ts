import { BrowserWindow, Rectangle } from 'electron';
import { BrowserWindowConstructorOptions } from 'electron/main';
import { getConfig } from '../utils/getConfig';
import { getTray } from './tray';

let mainWindow: BrowserWindow | null;

const defaultConfig: BrowserWindowConstructorOptions = {
  show: false,
  frame: false,
  resizable: false,
  fullscreenable: false,
  autoHideMenuBar: true,
  skipTaskbar: true,
  webPreferences: {
    devTools: process.env.NODE_ENV !== 'production',
    backgroundThrottling: false,
    contextIsolation: false,
    nodeIntegration: true,
  },
};

function createMainWindow() {
  mainWindow = new BrowserWindow({
    ...defaultConfig,
    width: 300,
    height: 340,
  });

  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadFile(__dirname + '/index.html');
  } else {
    mainWindow.loadURL('http://localhost:9000');
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send('config', getConfig());
  });

  return mainWindow;
}

function showMainWindow() {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }

  if (!mainWindow.isVisible() || !mainWindow.isFocused()) {
    const position = getCentralPosition(mainWindow.getBounds(), getTray()!.getBounds());

    mainWindow.setPosition(position.x, position.y, false);
    mainWindow.show();
    mainWindow.focus();
  }
}

function getMainWindow() {
  return mainWindow;
}

function getCentralPosition(windowBounds: Rectangle, trayBounds: Rectangle) {
  return {
    x: Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2),
    y: Math.round(trayBounds.y + trayBounds.height + 4),
  };
}

export { createMainWindow, showMainWindow, getMainWindow };
