import { HTMLElement } from "../common/HTMLElement";
import { Card } from "./Card";

export class Slide extends HTMLElement {
  constructor(parentNode, data) {
    super(parentNode, "div", "slider-item");
    this.data = data;

    this.cards = data.map((e) => new Card(this.node, e));
  }
}
