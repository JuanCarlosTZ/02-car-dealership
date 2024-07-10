import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { UpdateCarDTO } from './dto/update_car.dto';
import { CreateCarDTO } from './dto/create_car.dto';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) { }

    @Get()
    getAllCars(): {}[] {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseUUIDPipe) id: string) {
        console.log(id);
        const car = this.carsService.findOneById(id);
        if (!car) {
            throw new NotFoundException(`Was not found car id '${id}'`);
        }
        return car;
    }

    @Post()
    createCar(@Body() body: CreateCarDTO) {
        console.log(body);
        const car = this.carsService.create(body);
        return car;
    }

    @Patch(':id')
    updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateCarDTO) {
        const cars = this.carsService.update(id, body);
        return cars;
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string): void {
        if (!this.carsService.findOneById(id)) {
            throw new NotFoundException(`Car with id '${id}, was not found'`);
        }

        return this.carsService.remove(id);
    }
}
