import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { User } from 'entities/user.entity';
import { AddUserDto } from 'src/dtos/user/add.user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('api/user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get()  //GET https://localhost:3000/api/user/
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(':id')     //GET https://localhost:3000/api/user/id
    getById(@Param('id') id: number): Promise<User> {
        return this.userService.getById(id);
    }

    @Put()
    add( @Body() data: AddUserDto){
        
    }

}