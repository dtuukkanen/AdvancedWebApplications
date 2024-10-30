"use strict";
// Part 1
console.log("Hello World!");
let vehicle = {
    model: "Boring generic vehicle",
    color: "Red",
    year: 1993,
    power: 60
};
console.log(vehicle);
let car = {
    model: "Ford focus",
    color: "Green",
    year: 2016,
    power: 150,
    bodyType: "Hatchback",
    wheelCount: 4
};
let plane = {
    model: "Boeing 777",
    color: "White",
    year: 2020,
    power: 170000,
    wingspan: 65
};
let boat = {
    model: "Bella",
    color: "Black",
    year: 2022,
    power: 100,
    draft: 0.42
};
console.log(car);
console.log(plane);
console.log(boat);
// Part 4
class VehicleService {
    items = [];
    add(item) {
        this.items.push(item);
    }
    list() {
        return this.items;
    }
}
let carService = new VehicleService();
let boatService = new VehicleService();
carService.add(car);
boatService.add(boat);
console.log(carService.list());
console.log(boatService.list());
