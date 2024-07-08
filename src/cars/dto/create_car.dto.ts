import { IsString } from "class-validator";

export class CreateCarDTO {
    @IsString()
    readonly model: string;
    @IsString()
    readonly brand: string;
}