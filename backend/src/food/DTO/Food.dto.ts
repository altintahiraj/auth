import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
export class FoodDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @Transform(({ value }) => {
        if (typeof value === "string") {
            return Number(value);
        }
        return value;
    })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @Transform(({ value }) => {
        if (typeof value === "string") {
            if (value === "true") return true;
            if (value === "false") return false;
        }
        return value;
    })
    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;
}