import { Tray, Menu, nativeImage } from 'electron';
import * as trayIcon from '../resources/checkout-32x32.png';

let tray: Tray | null;

interface TrayCommands {
  readonly onWindowBlur: () => void;
  readonly onPaymentLinksCreate: () => void;
}

function constructMenu(commands: TrayCommands) {
  return Menu.buildFromTemplate([
    {
      label: 'Create a Payment Link',
      click: commands.onPaymentLinksCreate,
      accelerator: 'Option+P',
    },
    { type: 'separator' },
    {
      label: 'Quit',
      role: 'quit',
    },
  ]);
}

function createTray(commands: TrayCommands) {
  const image = nativeImage.createFromDataURL(trayIcon);

  tray = new Tray(
    image.resize({
      width: 16,
      height: 16,
    })
  );

  tray.setToolTip('Checkout.com');
  tray.setContextMenu(constructMenu(commands));

  tray.on('click', commands.onWindowBlur);
}

function getTray() {
  return tray;
}

export { createTray, getTray, TrayCommands };
