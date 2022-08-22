// Add functionality to objects or classes without inheritance

class Dog {
  constructor(name) {
    this.name = name;
  }
}

const animalFunctionality = {
  walk: () => console.log("walk"),
  sleep: () => console.log("sleep"),
};

const dogFuntionality = {
  __proto__: animalFunctionality,
  bark: () => console.log("bark"),
  fetch: () => console.log("fetch"),
  walk() {
    super.walk();
  },
  sleep() {
    super.sleep();
  },
};

Object.assign(Dog.prototype, dogFuntionality);

const pet1 = new Dog("Daisy");

console.log(pet1.name);
pet1.bark();
pet1.play();
pet1.walk();
pet1.sleep();
