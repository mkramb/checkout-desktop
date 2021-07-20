import { app, dialog } from 'electron';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const getConfig = () => {
  const configFilePath = join(app.getPath('home'), '.checkout/config.json');

  if (existsSync(configFilePath)) {
    try {
      const config = JSON.parse(readFileSync(configFilePath, 'utf-8'));

      return {
        endpoint: config.endpoint,
        authorization: config.authorization,
      };
    } catch (error) {
      console.error(error);
    }
  }

  dialog.showErrorBox(
    'Error Loading config',
    `Configuration at ${configFilePath} is missing. Please refer to instructions for installation`
  );

  app.exit();
};

export { getConfig };
