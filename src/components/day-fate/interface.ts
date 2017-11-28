import { DayFate } from './component';

export interface HTMLDayFateElement extends DayFate, HTMLElement {
}
declare var HTMLDayFateElement: {
  prototype: HTMLDayFateElement;
  new(): HTMLDayFateElement;
};
declare global {
  interface HTMLDayFateElementMap {
    "my-name": HTMLDayFateElement;
  }
  interface ElementTagNameMap {
    "my-name": HTMLDayFateElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "my-name": JSXElements.DayFateAttributes;
    }
  }
  namespace JSXElements {
    export interface DayFateAttributes extends HTMLAttributes {

    }
  }
}
