import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AddTstandardDto } from "src/dtos/tstandard/add.tsstandard.dto";
import { EditTstandardDto } from "src/dtos/tstandard/edit.tsstandard.dto";
import { ApiRes } from "src/misc/api.response.class";
import { TstandardService } from "src/services/tstandard/tstandard.service";


@Controller('api/tstandard')
export class TstandardController{
    constructor(
        private tstandardService: TstandardService
    ) { }

    @Get()
    async getAll(){
        return await this.tstandardService.getAll();
    }

    @Get(':id')
    async getById(@Param('id')id: number){
        return (await this.tstandardService.getById(id)) ?? new ApiRes("error", -1003, null);
    }

    @Post()
    async add( @Body() data: AddTstandardDto){
        return await this.tstandardService.add(data)
    }

    @Put(':id')
    async edit(@Param('id')id: number, @Body() data: EditTstandardDto){
        return await this.tstandardService.editById(id, data);
        
    }

}