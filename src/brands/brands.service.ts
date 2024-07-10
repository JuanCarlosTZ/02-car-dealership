import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    {
      'id': uuid(),
      'name': 'toyota',
      'createAt': new Date().getTime(),
    },
    {
      'id': uuid(),
      'name': 'jeep',
      'createAt': new Date().getTime(),
    }
  ];

  create(createBrandDto: CreateBrandDto): Brand {
    const brand: Brand = {
      'id': uuid(),
      ...createBrandDto,
      'createAt': new Date().getTime(),
    }
    this.brands.push(brand)
    return brand;
  }

  findAll(): Brand[] {
    return this.brands;
  }

  findOne(id: string): Brand {
    const brand = this.brands.find(brand => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id "${id}" was not founded`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);

    this.brands = this.brands.map(brand => {
      if (brand.id !== id) return brand;

      brandDB = {
        ...brand,
        ...updateBrandDto,
        'updateAt': new Date().getTime(),
      }

      return brandDB;
    })

    return brandDB;
  }

  remove(id: string): void {
    const brand = this.findOne(id);
    this.brands = this.brands.filter(brand => brand.id !== id)
  }
}
