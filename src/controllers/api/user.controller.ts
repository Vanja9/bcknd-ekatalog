import { Body, Controller, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common'
import { User } from 'src/entities/user.entity';
import { AddUserDto } from 'src/dtos/user/add.user.dto';
import { EditUserDto } from 'src/dtos/user/edite.user.dto';
import { ApiRes } from 'src/misc/api.response.class';
import { UserService } from 'src/services/user/user.service';
import { AllowToRoles } from 'src/misc/allow.to.roles.descriptor';
import { IsAdminCheckerGuard } from 'src/misc/isAdmin.checker.guard';

@Controller('api/user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get()  //GET https://localhost:3000/api/user/
    
    //@SetMetadata('allow_to_roles', ['0' , '1'])
    @UseGuards(IsAdminCheckerGuard)
    @AllowToRoles('0')

    async getAll(): Promise<User[]> {
        return await this.userService.getAll();
    }

    @Get(':id')     //GET https://localhost:3000/api/user/id
    @UseGuards(IsAdminCheckerGuard)
    @AllowToRoles('0')
    async getById(@Param('id') id: number) {
       /*  const user = await this.userService.getById(id);
        if(user == undefined) {
            return new ApiRes("", 0, "");
        }
        return user; */
        return (await this.userService.getById(id)) ?? new ApiRes("error", -1003, null);

    }

    @Post()
    @UseGuards(IsAdminCheckerGuard)
    @AllowToRoles('1')
    async add( @Body() data: AddUserDto): Promise<User | ApiRes>{
        return await this.userService.add(data)
    }

    @Put(':id')
    @UseGuards(IsAdminCheckerGuard)
    @AllowToRoles('1')
    async edit(@Param('id')id: number, @Body() data: EditUserDto): Promise<User | ApiRes>{
        return await this.userService.editById(id, data);
    }
        
}