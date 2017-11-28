import { FateWheel } from './component';

export interface HTMLFateWheelElement extends FateWheel, HTMLElement {
}
declare var HTMLFateWheelElement: {
  prototype: HTMLFateWheelElement;
  new(): HTMLFateWheelElement;
};
declare global {
  interface HTMLFateWheelElementMap {
    "fate-wheel": HTMLFateWheelElement;
  }
  interface ElementTagNameMap {
    "fate-wheel": HTMLFateWheelElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "fate-wheel": JSXElements.FateWheelAttributes;
    }
  }
  namespace JSXElements {
    export interface FateWheelAttributes extends HTMLAttributes {

    }
  }
}
