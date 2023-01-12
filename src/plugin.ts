import componentSource from './components/components';

import type { App } from 'vue';

export { install };

const install = (app: App) => {
  Object.entries(componentSource).forEach(([name, component]) => {
    app.component(name, component);
  });
};
