import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OperativniSistem } from "entities/OperativniSistem";
import { AddSystemDto } from "src/dtos/system/add.system.dto";
import { EditSystemDto } from "src/dtos/system/edit.system.dto";
import { ApiRes } from "src/misc/api.response.class";
import { Repository } from "typeorm";



@Injectable()
export class SystemService{
    constructor(
        @InjectRepository(OperativniSistem)
        private readonly system: Repository<OperativniSistem>
    ){}


    async getAll(){
        return await this.system.find();
    }

    async getById(id: number){
        return await this.system.findOne({
            where: {
                operativniSistemId: id
            }
        });
    }

    async add(data: AddSystemDto){
        let newSystem: OperativniSistem = new OperativniSistem();
        newSystem.naziv = data.naziv
    
    try{
        return await this.system.save(newSystem)
    } catch{
        return new ApiRes("error", -1001, null)
    }
    
    }

async editById(id: number, data: EditSystemDto){
    let system: OperativniSistem = await this.system.findOne({
        where: {
            operativniSistemId: id
        }
    });

    if(system == undefined){
        return new ApiRes("error", -1002, null)
    }

    if(data.naziv){
        system.naziv = data.naziv
    }
}

}