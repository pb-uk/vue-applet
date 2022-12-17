
import plugin from './plugin';

const onDOMContentLoaded = () => {
  if (!window.vueApplets) return;
  const { createApp} = Vue;
  window.vueApplets.forEach(({ app, mount }) => {
    createApp(app)
      .use(plugin)
      .mount(mount);
  });
};

if (document.readyState === 'loading') {
  // Loading hasn't finished yet.
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
} else {
  // `DOMContentLoaded` has already fired.
  onDOMContentLoaded();
}

export default plugin;
