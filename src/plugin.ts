import components from './components/components';
import { version } from '../package.json';

import type { App } from 'vue';

export type VueAppletType = {
  install: (app: App) => void;
  version: string;
};

export { install, version, components };

const install = (app: App) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
};
