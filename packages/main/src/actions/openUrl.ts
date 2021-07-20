import { ipcMain, shell, clipboard } from 'electron';

const registerOpenUrl = () => {
  ipcMain.on('open.url', (_event, url: string) => {
    clipboard.writeText(url);
    shell.openExternal(url);
  });
};

export { registerOpenUrl };
