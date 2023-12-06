import { Injectable, Param } from "@nestjs/common";
import { MemoryStoredFile} from "nestjs-form-data"
import * as crypto from "crypto"
import * as fs from "fs"



@Injectable()
export class FileService {
    async saveFile( file: MemoryStoredFile){
        const uuid = crypto.randomUUID();

        const name = uuid + "." + file.extension;

        await fs.promises.writeFile("./public/" + name, file.buffer)

        return "/" + name
    }

    async saveImage( photo : MemoryStoredFile ) {

        // Skaliranje slike, modifikacije itd...
        //const file = ...;
        // return await this.saveFile(file);


    }

     


}