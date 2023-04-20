import { getRandomItems, random } from "../utils";

export class SliderState {
  constructor(initialData, cardsAmount) {
    this.initialData = initialData;
    this.cardsAmount = cardsAmount;
  }

  init() {
    this.active = getRandomItems(this.initialData, this.cardsAmount);
    this.setRestData(this.initialData, this.active);

    this.next = getRandomItems(this.restData, this.cardsAmount);
    this.setRestData(this.restData, this.next);

    this.prev = [...this.restData, this.next[random(2)]];
  }

  addNextSlide() {
    this.prev = this.active;
    this.active = this.next;
    this.setRestData(this.initialData, this.active);
    this.next = getRandomItems(this.restData, this.cardsAmount);
  }

  addPrevSlide() {
    this.next = this.active;
    this.active = this.prev;
    this.setRestData(this.initialData, this.active);
    this.prev = getRandomItems(this.restData, this.cardsAmount);
  }

  setRestData(data, items) {
    this.restData = data.filter((e) => e.id !== items[0].id);
    this.restData = this.restData.filter((e) => e.id !== items[1].id);
    this.restData = this.restData.filter((e) => e.id !== items[2].id);
  }
}
