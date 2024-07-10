import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { CARS_SEED } from './data/car-seed.data';
import { BRANDS_SEED } from './data/brand-seed.data';

@Injectable()
export class SeedService {

  constructor(
    private readonly carService: CarsService,
    private readonly brandService: BrandsService
  ) { }

  runPopulate() {
    this.carService.fillService(CARS_SEED);
    this.brandService.fillService(BRANDS_SEED);

    return `SEED Executed`;
  }
}
