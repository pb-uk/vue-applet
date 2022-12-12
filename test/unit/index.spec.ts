import { expect } from 'chai';

import * as VueApplet from '../../src/index';

describe('The default entry point', function () {
  it('should have a version', function () {
    expect(VueApplet.version).to.equal('1.0.0');
  });

  it('should expose Vue', function () {
    expect(VueApplet.Vue.version).to.equal('1.0.0');
  });
});
