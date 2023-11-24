import { HasExtension, HasMimeType, IsFile, MemoryStoredFile,  } from "nestjs-form-data";

export class PhotoDTO{

    artikl_id : number 
    
    @IsFile()
    @HasMimeType(["image/png", "image/jpeg"])
    @HasExtension(["png", "jpg", "jpeg"])
    photo : MemoryStoredFile;

}