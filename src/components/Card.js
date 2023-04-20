import { HTMLElement } from "../common/HTMLElement";

export class Card extends HTMLElement {
  constructor(parentNode, data) {
    super(parentNode, "div", "card");

    this.setAttributes({ "data-name": data.name });

    const img = new HTMLElement(this.node, "img");
    img.setAttributes({
      src: data.img,
      alt: data.type,
      "data-name": data.name,
    });

    this.title = new HTMLElement(this.node, "h4", "name", data.name);
    this.title.setAttributes({ "data-name": data.name });

    this.node.addEventListener("click", (e) => {
      this.showPopup(e.currentTarget.dataset.name);
    });
  }
}
