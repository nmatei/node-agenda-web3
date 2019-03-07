class Game {
  constructor(n) {
    console.warn("new GAME: ", n);
    this.name = n;
  }

  start() {
    console.info("name:", this.name);
    return `We started ${this.name}`;
  }
}

class Sah extends Game {
  constructor(n) {
    super(n);
  }

  mat() {
    console.info("sah Mat");
    return true;
  }
}

var Fabrica = {
  name: "Clujana",
  getName: function() {
    console.info("Fabrica vs this", Fabrica == this);
    return "Fabric Name:" + this.name;
  }
};

class Dog {
  constructor(name) {
    this.name = name;
  }
  woof() {
    console.log(this.name + " said woof!", this);
  }
}
var Rex = new Dog("Rex");
var dog = {
  orice: true,
  name: "Laika"
};
Rex.woof();
Rex.woof.call(dog);

function getPerson(age) {
  return {
    age: age,
    friends: age * 2
  };
}
var age = 3;
var friends = 15;
const p = getPerson(age);
console.warn(p);
console.info(p["friends"]);
console.info(p.friends);
