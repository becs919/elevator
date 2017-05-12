class Elevator {
  constructor() {
    this.currentFloor = 0,
    this.floorsTraversed = 0,
    this.stops = [],
    this.queue = [],
    this.currentRiders = [],
    this.motionStatus = "idle"
  }

  takeRequest(person) {
    this.queue.push(person);

    this.checkQueue();
  };

  checkQueue() {
    if (this.queue.length > 0) {

      this.motionStatus = "moving";
      this.takeRider();

    } else if (this.queue.length === 0) {

      this.motionStatus = "idle";
    }
  };

  takeRider() {
      this.currentFloor = this.queue[0].currentFloor;

      this.stops.push(this.currentFloor);

      this.currentRiders.push(this.queue[0]);

      this.currentFloor = this.queue[0].dropOffFloor;

      this.stops.push(this.currentFloor);

      this.currentRiders.pop();

      this.queue.splice(0,1);

      this.motionStatus = "idle";
  };

  getStops() {
    this.getTraversed(this.stops);
    return this.stops;
  };

  getTraversed(array) {
    let x = 0;
    array.unshift(0);

    for(let i = (array.length-1); i>=1; --i ) {
      x = x + Math.abs(array[i]-array[i-1])
    };

    this.stops.splice(0,1);
    return this.floorsTraversed = x;
  };

  reset() {
    this.currentFloor = 0,
    this.floorsTraversed = 0,
    this.stops = [],
    this.queue = [],
    this.currentRiders = [],
    this.motionStatus = "idle"
  };
};

class Person {
  constructor(name, currentFloor, dropOffFloor) {
    this.name = name,
    this.currentFloor = currentFloor,
    this.dropOffFloor = dropOffFloor
  };
};

module.exports = { Elevator, Person };
