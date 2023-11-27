import { Body, Controller, Inject, Post } from "@nestjs/common";
import { FormDataRequest } from "nestjs-form-data";
import { PhotoDTO } from "src/dtos/photo/photo.dto";
import { FileService } from "src/services/file/file.service";
import { PhotoService } from "src/services/photo/photo.service";
import * as fileType from 'file-type'

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
    

    


}