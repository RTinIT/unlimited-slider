import { HTMLElement } from "../common/HTMLElement";
import { Slide } from "./Slide";
import { SliderState } from "./SliderState";
import next from "../../btn-paginator-right-next.svg";
import prev from "../../btn-paginator-left-prev.svg";

export class Slider extends HTMLElement {
  constructor(parent, data, cardsAmount) {
    super(parent, "div", "slider-wrapper");

    this.slider = new HTMLElement(this.node, "div", "slider");
    this.preBtn = new HTMLElement(this.node, "button", "pre-btn");
    this.prevImg = new HTMLElement(this.preBtn.node, "img");
    this.prevImg.setAttributes({ src: prev });
    this.nextBtn = new HTMLElement(this.node, "button", "next-btn");
    this.prevImg = new HTMLElement(this.nextBtn.node, "img");
    this.prevImg.setAttributes({ src: next });

    this.data = data;
    this.cardsAmount = cardsAmount;
    this.state = new SliderState(this.data, this.cardsAmount);
    this.state.init();

    this.slideLeft = new Slide(this.slider.node, this.state.prev);
    this.slideActive = new Slide(this.slider.node, this.state.active);
    this.slideRight = new Slide(this.slider.node, this.state.next);

    this.enableBtn();

    this.slider.node.addEventListener("animationend", (animationEvent) => {
      if (animationEvent.animationName === "move-left") {
        this.slider.node.classList.remove("pre-slide");
        this.slideRight.destroy();
        this.slideRight = this.slideActive;
        this.slideActive = this.slideLeft;
        this.state.addPrevSlide();

        this.slideLeft = new Slide(null, this.state.prev);
        this.slider.node.prepend(this.slideLeft.node);
      } else {
        this.slider.node.classList.remove("next-slide");
        this.slideLeft.destroy();
        this.slideLeft = this.slideActive;
        this.slideActive = this.slideRight;
        this.state.addNextSlide();

        this.slideRight = new Slide(this.slider.node, this.state.next);
      }
      this.enableBtn();
    });
  }

  init() {
    this.slideLeft = new Slide(this.slider.node, this.state.prev);
    this.slideActive = new Slide(this.slider.node, this.state.active);
    this.slideRight = new Slide(this.slider.node, this.state.next);
  }

  moveRight() {
    this.slider.node.classList.add("next-slide");
    this.disableBtn();
  }

  moveLeft() {
    this.slider.node.classList.add("pre-slide");
    this.disableBtn();
  }

  disableBtn() {
    this.preBtn.node.removeEventListener("click", () => {
      this.moveLeft();
    });
    this.nextBtn.node.removeEventListener("click", () => {
      this.moveRight();
    });
  }

  enableBtn() {
    this.nextBtn.node.addEventListener("click", () => {
      this.moveRight();
    });
    this.preBtn.node.addEventListener("click", () => {
      this.moveLeft();
    });
  }
}
