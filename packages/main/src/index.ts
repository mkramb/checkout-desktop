import { app, globalShortcut } from 'electron';
import { createMainWindow, showMainWindow, getMainWindow } from './components/window';
import { createTray, getTray, TrayCommands } from './components/tray';
import { registerOpenUrl } from './actions/openUrl';

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.dock.hide();
app.setName('Checkout.com');

const commands: TrayCommands = {
  onWindowBlur: () => getMainWindow()?.hide(),
  onPaymentLinksCreate: () => showMainWindow(),
};

app.whenReady().then(() => {
  registerOpenUrl();

  createTray(commands);
  createMainWindow();

  app.on('browser-window-blur', () => {
    getMainWindow()?.hide();
  });

  globalShortcut.register('Option+P', commands.onPaymentLinksCreate);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('activate', () => {
  if (getTray() === null) {
    createTray(commands);
  }
});
