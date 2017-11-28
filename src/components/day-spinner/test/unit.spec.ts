import { flush, render } from '@stencil/core/testing';
import { DaySpinner } from '../component';

describe('day-spinner', () => {
  it('should build', () => {
    expect(new DaySpinner()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [DaySpinner],
        html: '<day-spinner></day-spinner>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toMatch(/DaySpinner/);
    });


  });
});
