import { flush, render } from '@stencil/core/testing';
import { DayFate } from '../component';

describe('day-fate', () => {
  it('should build', () => {
    expect(new DayFate()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [DayFate],
        html: '<day-fate></day-fate>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toMatch(/DayFate/);
    });


  });
});
