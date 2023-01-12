import { install } from './plugin';
import { createApp } from 'vue';
import * as Vue from 'vue';
import type { Component } from 'vue';
import { version } from '../package.json';

type AppletAppParams = { Vue: unknown; version: string };
type AppletDefinition = {
  app: (p: AppletAppParams) => Component;
  mount: string | HTMLElement;
};

declare global {
  const vueApplets: AppletDefinition[];
}

const onDOMContentLoaded = () => {
  if (!vueApplets) return;
  vueApplets.forEach(({ app, mount }) => {
    createApp(app({ Vue, version })).use(install).mount(mount);
  });
};

if (document.readyState === 'loading') {
  // Loading hasn't finished yet.
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
} else {
  // `DOMContentLoaded` has already fired.
  onDOMContentLoaded();
}
