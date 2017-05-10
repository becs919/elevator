class Elevator {
  constructor() {
    this.currentFloor = 0,
    this.floorsTraversed = 0,
    this.stops = [],
    this.queue = [],
    this.currentRiders = [],
    this.motionStatus = "idle"
  }

  currentFloor() {
    return this.currentFloor;
  };

  goToFloor(person) {
    this.queue.push(person);

    this.checkQueue();
  };

  checkQueue() {
    if (this.queue.length > 0) {
      // change to moving
      this.changeStatus();
      // moving
      this.moving();
    } else if (this.queue.length === 0) {
      this.motionStatus = "idle"
    }
  };

  moving() {
    if (this.motionStatus === "moving") {
      // moving to current floor of person
      this.currentFloor = this.queue[0].currentFloor;
      // adding stop to array
      this.stops.push(this.currentFloor);
      // add rider to riders array
      this.currentRiders.push(this.queue[0])
      // drop off person
      this.currentFloor = this.queue[0].dropOffFloor;
      // add stop to array
      this.stops.push(this.currentFloor);
      // take rider out of array
      this.currentRiders.pop();
      // remove from que
      this.queue.splice(0,1);
      // change status to idle again? maybe here?
      this.changeStatus();
    }
  };

  changeStatus() {
    this.motionStatus === "idle" ? this.motionStatus = "moving" : this.motionStatus = "idle"
  };

  getStops() {
    this.getTraversed(this.stops)
    return this.stops
  };

  getTraversed(array) {
    let x = 0
    array.unshift(0)

    for(let i = (array.length-1); i>=1; --i ) {
      x = x + Math.abs(array[i]-array[i-1])
    }

    this.stops.splice(0,1)
    return this.floorsTraversed = x
  };

  reset() {
    this.currentFloor = 0,
    this.floorsTraversed = 0,
    this.stops = [],
    this.queue = [],
    this.currentRiders = [],
    this.motionStatus = "idle"
  }
};

class Person {
  constructor(name, currentFloor, dropOffFloor) {
    this.name = name,
    this.currentFloor = currentFloor,
    this.dropOffFloor = dropOffFloor
  }
};

module.exports = { Elevator, Person };
