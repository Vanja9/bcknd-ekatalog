import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AddProizvodjacDto } from "src/dtos/proizvodjac/add.proizvodjac.dto";
import { EditProizvodjacDto } from "src/dtos/proizvodjac/edit.proizvodjac.dto";
import { ApiRes } from "src/misc/api.response.class";
import { ProizvodjacService } from "src/services/proizvodjac/proizvodjac.service";

@Controller('api/proizvodjac')
export class ProizvodjacController{
    constructor(
        private proizvodjacService: ProizvodjacService
    ) { }

    @Get()
    async getAll(){
        return await this.proizvodjacService.getAll();
    }

    @Get(':id')
    async getById(@Param('id')id: number){
        return (await this.proizvodjacService.getById(id)) ?? new ApiRes("error", -1003, null);
    }

    @Post()
    async add( @Body() data: AddProizvodjacDto){
        return await this.proizvodjacService.add(data)
    }

    @Put(':id')
    async edit(@Param('id')id: number, @Body() data: EditProizvodjacDto){
        return await this.proizvodjacService.editById(id, data);
        
    }

}