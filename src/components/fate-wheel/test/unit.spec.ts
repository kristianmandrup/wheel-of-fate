import { flush, render } from '@stencil/core/testing';
import { FateWheel } from '../component';

describe('fate-wheel', () => {
  it('should build', () => {
    expect(new FateWheel()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [FateWheel],
        html: '<fate-wheel></fate-wheel>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toMatch(/FateWheel/);
    });


  });
});
