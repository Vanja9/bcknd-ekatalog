import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Photo } from "src/entities/Photo";
import { ApiRes } from "src/misc/api.response.class";
import { Repository } from "typeorm";


@Injectable()
export class PhotoService{
    constructor(
        @InjectRepository(Photo)
        private readonly photo: Repository<Photo>
    ){}

    async add (artikl_id : number, image_path : string ){

        

        let newImg : Photo = new Photo()
        newImg.artiklId = artikl_id
        newImg.imagePath = image_path

        const saveImg = await this.photo.save(newImg)
        
    try{
        return await this.photo.save(saveImg)
    } catch{
        return new ApiRes("error", -1006, null)
    }
 
    }

    async findOneByArticleId(id : number){
        return await this.photo.findOne({
            where:{
                artiklId : id
            }
        })
    }

    async deleteByArticleId(id : number) {
        return await this.photo.delete({
            artiklId: id
        });
    }

    async deleteById (id : number){
        return await this.photo.delete(id)
    }

}