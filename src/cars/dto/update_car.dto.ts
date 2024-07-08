import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateCarDTO {
    @IsOptional()
    @IsUUID()
    readonly id?: string;

    @IsOptional()
    @IsString()
    readonly model?: string;

    @IsOptional()
    @IsString()
    readonly brand?: string;
}