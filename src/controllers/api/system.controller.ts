import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AddSystemDto } from "src/dtos/system/add.system.dto";
import { EditSystemDto } from "src/dtos/system/edit.system.dto";
import { SystemService } from "src/services/system/system.service";


@Controller('api/system')
export class SystemController{
    constructor(
        private systemService: SystemService
    ){}

    @Get()
    async getAll(){
        return await this.systemService.getAll();
    }

    @Get(':id')
    async getById(@Param('id')id: number){
        return (await this.systemService.getById(id))
    }

    @Post()
    async add( @Body() data: AddSystemDto){
        return await this.systemService.add(data)
    }

    @Put(':id')
    async edit(@Param('id')id: number, @Body() data: EditSystemDto){
        return await this.systemService.editById(id, data)
    }




}