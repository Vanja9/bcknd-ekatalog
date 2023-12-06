import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AddArtiklDto } from "src/dtos/artikl/add.artikl.dto";
import { EditArtiklDto } from "src/dtos/artikl/edit.artikl.dto";
import { ApiRes } from "src/misc/api.response.class";
import { ArtiklService } from "src/services/artikl/artikl.service";



@Controller('api/artikl')
export class ArtiklController{
    constructor(
        private artiklService: ArtiklService
    ) { }


    
    @Get()
    async getAll(){
        return await this.artiklService.getAll();
    }

    @Get(':id')
    async getById(@Param('id')id: number){
        return (await this.artiklService.getById(id)) ?? new ApiRes("error", -1003, null);
    }

    @Post()
    async add( @Body() data: AddArtiklDto){
        return await this.artiklService.add(data)
    }

    @Put(':id')
    async edit(@Param('id')id: number, @Body() data: EditArtiklDto){
        return await this.artiklService.editById(id, data);
        
    }

    

}