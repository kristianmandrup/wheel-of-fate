import { DaySpinner } from './component';

export interface HTMLDaySpinnerElement extends DaySpinner, HTMLElement {
}
declare var HTMLDaySpinnerElement: {
  prototype: HTMLDaySpinnerElement;
  new(): HTMLDaySpinnerElement;
};
declare global {
  interface HTMLDaySpinnerElementMap {
    "day-spinner": HTMLDaySpinnerElement;
  }
  interface ElementTagNameMap {
    "day-spinner": HTMLDaySpinnerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "day-spinner": JSXElements.DaySpinnerAttributes;
    }
  }
  namespace JSXElements {
    export interface DaySpinnerAttributes extends HTMLAttributes {

    }
  }
}
