import { Body, Controller, Delete, Inject, Param, Post } from "@nestjs/common";
import { FormDataRequest } from "nestjs-form-data";
import { PhotoDTO } from "src/dtos/photo/photo.dto";
import { FileService } from "src/services/file/file.service";
import { PhotoService } from "src/services/photo/photo.service";
import { ApiRes } from "src/misc/api.response.class";
import * as fs from 'fs'


@Controller("api/photo")
export class PhotoController{

    @Inject()
    private readonly fileService : FileService;

    @Inject()
    private readonly photoService : PhotoService;
    

    @Post()
    @FormDataRequest()
    async saveFile(@Body() body : PhotoDTO){
        
        const imagePath = await this.fileService.saveFile(body.photo)

        return await this.photoService.add(body.artikl_id, imagePath);

    }
    

    @Delete('deletePhoto/:artiklId')
    public async deletePhoto(
        @Param('artiklId') artiklId : number
    ){
        const photo = await this.photoService.findOneByArticleId(artiklId);

        if (!photo) {
            return new ApiRes('error', -5012, null)
        }

        try {
            fs.unlinkSync("./public" + photo.imagePath)
        } catch {}
        
        const deleteResult = await this.photoService.deleteByArticleId(artiklId)
        if(deleteResult.affected == 0){
            return new ApiRes('error', -5012, 'Slika nije pronadjena')
        }

        return new ApiRes('ok', -0, 'Slika obrisana') 



    }



}