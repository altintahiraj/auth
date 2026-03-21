import { Controller, Post, Get, Put, Delete, UseGuards, UseInterceptors, UploadedFile, Body, Param, Res } from '@nestjs/common';
import { FoodService } from './food.service';
import { AuthGuard } from '../guards/auth.guards';
import { PermissionGuard } from 'src/guards/permission.guards';
import { FoodDto } from './DTO/Food.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { Roles } from '../decorators/roles.decorator';

@UseGuards(AuthGuard, PermissionGuard)
@Controller('food')
export class FoodController {
    constructor(private readonly foodService: FoodService) { }

    @Get('all')
    public async getAll() {
        return await this.foodService.getAll();
    }

    @Get('get/:id')
    public async getById(@Param() id: number) {
        return await this.foodService.getCategoryById(id);
    }

    @Roles('admin')
    @Post('create')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: "./uploads",
            filename: (req, file, cb) => {
                cb(null, file.originalname)
            }
        })
    }))
    public async createFood(@Body() food: FoodDto, @UploadedFile() file: Express.Multer.File) {
        return await this.foodService.createFood(food, file.originalname);
    }
    @Get('uploads/:filename')
    getImage(@Param('filename') filename: string, @Res() res: Response) {
        console.log(filename);
        res.sendFile(filename, { root: 'uploads/' });
    }
}
