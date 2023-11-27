import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artikl } from "src/entities/Artikl";
import { AddArtiklDto } from "src/dtos/artikl/add.artikl.dto";
import { EditArtiklDto } from "src/dtos/artikl/edit.artikl.dto";
import { ApiRes } from "src/misc/api.response.class";
import { Repository } from "typeorm";


@Injectable()
export class ArtiklService{
    constructor(
        @InjectRepository(Artikl)
        private readonly artikl: Repository<Artikl>
    ){}

    async getAll(){
        return await this.artikl.find();
    }

    async getById(id: number){
        return await this.artikl.findOne({
            where: {
                artiklId: id
            }
        });
    }

    async add( data: AddArtiklDto){
    
    let newArtikl: Artikl = new Artikl();
    newArtikl.telefonId = data.telefon_id
    newArtikl.operativniSistemId = data.operativni_sistem_id
    newArtikl.tStandardId = data.t_standard_id
    newArtikl.memorija = data.memorija
    newArtikl.ramMemorija = data.ram_memorija
    newArtikl.baterija = data.baterija
    newArtikl.velicinaDijagonale = data.velicina_dijagonale
    newArtikl.opis = data.opis
    newArtikl.cena = data.cena
    
    try{
        return await this.artikl.save(newArtikl)
    } catch{
        return new ApiRes("error", -1001, "Vec postoji")
    }

}

async editById(id: number, data: EditArtiklDto){
    let artikl: Artikl = await this.artikl.findOne({
        where: {
            artiklId: id
        }
    });

    if(artikl == undefined){
        return new ApiRes("error", -1002, null)
    }
    if(data.telefon_id){
        artikl.telefonId = data.telefon_id
    }
    if(data.operativni_sistem_id){
        artikl.operativniSistemId = data.operativni_sistem_id

    }
    if(data.ts_standard_id){
        artikl.tStandardId = data.ts_standard_id
    }
    if(data.memorija){
        artikl.memorija = data.memorija
    }
    if(data.ram_memorija){
        artikl.ramMemorija = data.ram_memorija
    }
    if(data.baterija){
        artikl.baterija = data.baterija
    }
    if(data.velicina_dijagonale){
        artikl.velicinaDijagonale = data.velicina_dijagonale
    }
    if(data.opis){
        artikl.opis = data.opis
    }
    if(data.cena){
        artikl.cena = data.cena
    }



}


}