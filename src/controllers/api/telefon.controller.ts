import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { EditUserDto } from "src/dtos/user/edite.user.dto";
import { ApiRes } from "src/misc/api.response.class";
import { PhoneService } from "src/services/phone/phone.service";
import { AddPhoneDto } from "src/dtos/phone/add.phone.dto";
import { EditPhoneDto } from "src/dtos/phone/edit.phone.dto";

@Controller('api/phone')
export class PhoneController{
    constructor(
        private phoneService: PhoneService
    ){}
    
    @Get()
    async getAll(){
        return await this.phoneService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number){
        return(await this.phoneService.getById(id) ?? new ApiRes("error", -1004, null));

    }

    @Put(":id")
    async edit(@Param('id')id: number, @Body() data: EditPhoneDto){
        return await this.phoneService.editById(id, data);
    }

    @Post()
    async add( @Body() data: AddPhoneDto){
    return await this.phoneService.add(data)
    }
}
