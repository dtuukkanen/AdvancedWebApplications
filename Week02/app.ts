// Part 1
console.log("Hello World!");

// Part 2
type TVehicle = {
    model: string;
    color: string;
    year: number;
    power: number;
}

let vehicle: TVehicle = {
    model: "Boring generic vehicle",
    color: "Red",
    year: 1993,
    power: 60
}

console.log(vehicle);

// Part 3
interface IVehicle {
    model: string;
    color: string;
    year: number;
    power: number;
}

interface ICar extends IVehicle {
    bodyType: string;
    wheelCount: number;
}

interface IBoat extends IVehicle {
    draft: number;
}

interface IPlane extends IVehicle {
    wingspan: number;
}

let car: ICar = {
    model: "Ford focus", 
    color: "Green", 
    year: 2016, 
    power: 150, 
    bodyType: "Hatchback", 
    wheelCount: 4 
}

let plane: IPlane = {
    model: "Boeing 777", 
    color: "White", 
    year: 2020, 
    power: 170000, 
    wingspan: 65
}

let boat: IBoat = {
    model: "Bella", 
    color: "Black", 
    year: 2022, 
    power: 100, 
    draft: 0.42
}

console.log(car);
console.log(plane);
console.log(boat);

// Part 4
class VehicleService<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    list(): T[] {
        return this.items;
    }
}

let carService = new VehicleService<ICar>();
let boatService = new VehicleService<IBoat>();

carService.add(car);
boatService.add(boat);

console.log(carService.list());
console.log(boatService.list());
