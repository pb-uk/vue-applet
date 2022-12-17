
import componentSource from './components/components';

import { version } from '../package.json';

const install = (app) => {
  Object.entries(componentSource).forEach(([name, component]) => {
    console.log(componentSource, name);
    app.component(name, component)
  });
};

export default { version, install };
