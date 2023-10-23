import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TStandard } from "entities/TStandard";
import { AddTstandardDto } from "src/dtos/tstandard/add.tsstandard.dto";
import { EditTstandardDto } from "src/dtos/tstandard/edit.tsstandard.dto";
import { ApiRes } from "src/misc/api.response.class";
import { Repository } from "typeorm";


@Injectable()
export class TstandardService{
    constructor(
        @InjectRepository(TStandard)
    private readonly tstandard: Repository<TStandard>
    ){}

    async getAll(){
        return await this.tstandard.find();
    }

    async getById(id: number){
        return await this.tstandard.findOne({
            where: {
                tStandardId: id
            }
        });
    }

    async add(data: AddTstandardDto){
        let newTstandard: TStandard = new TStandard()
        newTstandard.naziv = data.naziv

        try{
            return await this.tstandard.save(newTstandard)
        } catch{
            return new ApiRes("error", -1001, "Vec postoji")
        }
    }

    async editById(id: number, data: EditTstandardDto){
        let tstandard: TStandard = await this.tstandard.findOne({
            where: {
                tStandardId: id
            }
        });
    
        if(tstandard == undefined){
            return new ApiRes("error", -1002, null)
        }

        if(data.naziv){
            tstandard.naziv = data.naziv
        }
    

    }
    

}