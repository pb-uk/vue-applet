import { createApp } from 'vue';
import * as Vue from 'vue';

import * as VueApplet from './plugin';
import { install } from './plugin';

import type { Component } from 'vue';
import type { VueAppletType } from './plugin';

export type AppletAppParams = { Vue: unknown; VueApplet: VueAppletType };

export type AppletDefinition = {
  app: (p: AppletAppParams) => Component;
  mount: string | HTMLElement;
};

declare global {
  const vueApplets: AppletDefinition[];
}

const onDOMContentLoaded = () => {
  if (!vueApplets) return;
  vueApplets.forEach(({ app, mount }) => {
    // Pass Vue and the VueApplet plugin to the app generator
    createApp(app({ Vue, VueApplet })).use(install).mount(mount);
  });
};

if (document.readyState === 'loading') {
  // Loading hasn't finished yet.
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
} else {
  // `DOMContentLoaded` has already fired.
  onDOMContentLoaded();
}
