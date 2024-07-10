import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UpdateCarDTO } from './dto/update_car.dto';
import { CreateCarDTO } from './dto/create_car.dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        // { 'id': uuid(), 'brand': 'Toyota', 'model': 'CRV' },
        // { 'id': uuid(), 'brand': 'Ford', 'model': 'Escape' },
        // { 'id': uuid(), 'brand': 'Honda', 'model': 'Civic' },
    ];

    findAll(): {}[] {
        return this.cars;
    }

    findOneById(id: string) {
        const carIndex = this.cars.findIndex(car => car.id === id);
        if (carIndex == -1) throw new NotFoundException(`Car with id '${id}, was not found'`);

        const car = this.cars.find(car => car.id === id)

        return car;
    }

    create(body: CreateCarDTO): Car {
        const car: Car = { id: uuid(), ...body };
        this.cars.push(car);

        return car;
    }

    update(id: string, body: UpdateCarDTO): Car {
        if (body.id && id != body.id) {
            throw new NotFoundException(`Car id and updated body id don't match`);
        }

        let carDB = this.findOneById(id);

        this.cars = this.cars.map((car) => {
            if (car.id != id) return car;

            carDB = { ...carDB, ...body, id };
            return carDB;
        });

        return carDB;
    }

    remove(id: string): void {
        const carDB = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id != id);
    }

    fillService(pCars: Car[]): void {
        this.cars = pCars;
    }
}
