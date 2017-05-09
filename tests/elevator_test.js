require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});
let assert = require('assert');

const { Elevator, Person } = require('../elevator')

describe('Elevator', function() {
  let elevator = new Elevator();

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    // let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };

    let person = new Person("Brittany", 2,  5);
    elevator.goToFloor(person);

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 5]);
  });

  it('should bring a rider to a floor below their current floor', () => {
    // let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };

    let person = new Person("Brittany", 8,  3);

    elevator.goToFloor(person);

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [8, 3]);
  });

  it('should calculate floorsTraversed, going up', () => {
    let person = new Person("Brittany", 2,  7);

    elevator.goToFloor(person);

    assert.equal(elevator.currentFloor, 7);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 7]);
    assert.equal(elevator.floorsTraversed, 7);
  });

  it('should calculate floorsTraversed, going down', () => {
    let person = new Person("Brittany", 8,  3);

    elevator.goToFloor(person);

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [8, 3]);
    assert.equal(elevator.floorsTraversed, 13);
  });

  it('should have a reset method', () => {
    let person = new Person("Brittany", 8,  3);

    elevator.goToFloor(person);

    assert.equal(elevator.currentFloor, 3);
    assert.deepEqual(elevator.getStops(), [8, 3]);
    assert.equal(elevator.floorsTraversed, 13);

    elevator.reset();

    assert.equal(elevator.currentFloor, 0);
    assert.deepEqual(elevator.getStops(), []);
    assert.equal(elevator.floorsTraversed, 0);
    assert.deepEqual(elevator.currentRiders, []);
    assert.deepEqual(elevator.queue, []);

  });

  it('should have a getStops method', () => {
    let person = new Person("Brittany", 8,  3);
    let person2 = new Person("Robbie", 8,  1);

    elevator.goToFloor(person);

    assert.deepEqual(elevator.getStops(), [8, 3]);

    elevator.goToFloor(person2);
    assert.deepEqual(elevator.getStops(), [8, 3, 8, 1]);
  });

  it('should have a currentFloor method', () => {
    let person = new Person("Brittany", 8,  3);

    assert.equal(elevator.currentFloor, 0);

    elevator.goToFloor(person);

    assert.deepEqual(elevator.getStops(), [8, 3]);
    assert.equal(elevator.currentFloor, 3);
  });

  it('should have a getTraversed method', () => {
    let person = new Person("Brittany", 8,  3);
    let person2 = new Person("Robbie", 8,  1);

    elevator.goToFloor(person);

    assert.deepEqual(elevator.getStops(), [8, 3]);
    assert.equal(elevator.getTraversed(elevator.stops), 13);
    assert.equal(elevator.floorsTraversed, 13);

    elevator.goToFloor(person2);
    assert.deepEqual(elevator.getStops(), [8, 3, 8, 1]);
    assert.equal(elevator.getTraversed(elevator.stops), 25);
    assert.equal(elevator.floorsTraversed, 25);
  });

  it('should have a checkQueue method', () => {
    let person = new Person("Brittany", 8,  3);

    elevator.queue.push(person);

    assert.equal(elevator.queue[0].name, person.name);
    assert.equal(elevator.queue[0].currentFloor, person.currentFloor);
    assert.equal(elevator.queue[0].dropOffFloor, person.dropOffFloor);

    elevator.checkQueue();

    assert.deepEqual(elevator.queue, []);
    assert.deepEqual(elevator.getStops(), [8, 3]);
    assert.deepEqual(elevator.motionStatus, 'idle');
  });


});
