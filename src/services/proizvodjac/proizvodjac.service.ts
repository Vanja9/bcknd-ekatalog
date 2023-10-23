import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Proizvodjac } from "entities/Proizvodjac";
import { AddPhoneDto } from "src/dtos/phone/add.phone.dto";
import { AddProizvodjacDto } from "src/dtos/proizvodjac/add.proizvodjac.dto";
import { EditProizvodjacDto } from "src/dtos/proizvodjac/edit.proizvodjac.dto";
import { ApiRes } from "src/misc/api.response.class";
import { Repository } from "typeorm";


@Injectable()
export class ProizvodjacService{
    constructor(
        @InjectRepository(Proizvodjac)
        private readonly proizvodjac: Repository<Proizvodjac>
    ){}

    async getAll(){
    return await this.proizvodjac.find();
    }

    async getById(id: number){
        return await this.proizvodjac.findOne({
            where: {
                proizvodjacId: id
            }
        });
    }

    async add(data: AddProizvodjacDto){
        let newProizvodjac: Proizvodjac = new Proizvodjac();
        newProizvodjac.naziv = data.naziv
    
    try{
        return await this.proizvodjac.save(newProizvodjac)
    } catch{
        return new ApiRes("error", -1001, "Vec postoji")
    }
}

async editById(id: number, data: EditProizvodjacDto){
    let proizvodjac: Proizvodjac = await this.proizvodjac.findOne({
        where: {
            proizvodjacId: id
        }
    });

    if(proizvodjac == undefined){
        return new ApiRes("error", -1002, null)
    }

    if(data.naziv){
        proizvodjac.naziv = data.naziv
    }

}

}