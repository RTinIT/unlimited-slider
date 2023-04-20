const random = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkRepeat = (randomItems, data, amount) => {
  let randomItem = data[random(amount)];
  const hasAlready = randomItems.some((e) => e.id === randomItem.id);
  if (!hasAlready) return randomItem;
  return checkRepeat(randomItems, data, amount);
};

const getRandomItems = (data, amount) => {
  const items = [];

  for (let i = 0; i < amount; i++) {
    const notRepeat = checkRepeat(items, data, data.length - 1);
    items.push(notRepeat);
  }

  return items;
};

export { random, getRandomItems };
