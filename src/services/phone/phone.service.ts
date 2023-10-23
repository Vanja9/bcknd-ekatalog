import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Telefon } from "entities/Telefon";
import { AddPhoneDto } from "src/dtos/phone/add.phone.dto";
import { EditPhoneDto } from "src/dtos/phone/edit.phone.dto";
import { ApiRes } from "src/misc/api.response.class";
import { Repository } from "typeorm";



@Injectable()
export class PhoneService {
    constructor(
        @InjectRepository(Telefon)
        private readonly phone: Repository<Telefon>
    ){ }

    async getAll(): Promise<Telefon[]>{
        return await this.phone.find();
    }

    async getById(id: number){
        return await this.phone.findOne({
            where: {
                telefonId: id
            }
        });
    }

async add(data: AddPhoneDto){
    let newPhone: Telefon = new Telefon();
    newPhone.proizvodjacId = data.proizvodjac_id;
    newPhone.model = data.model;
    newPhone.godinaProizvodnje = data.godina_proizvodnje
    
    try{
        return await this.phone.save(newPhone)
    } catch{
        return new ApiRes("error", -1001, "Vec postoji")
    }
}

async editById(id: number, data: EditPhoneDto){
    let phone: Telefon = await this.phone.findOne({
        where: {
            telefonId: id
        }
    });

    if( phone == undefined){
        return new ApiRes("error", -1002, null);
    }

    if(data.model) {
        phone.model = data.model;
    }
    if(data.godina_proizvodnje) {
        phone.godinaProizvodnje = data.godina_proizvodnje
    }
    if(data.proizvodjac_id){
        phone.proizvodjacId = data.proizvodjac_id
    }
}


}