import { Injectable } from "@nestjs/common";
import { MemoryStoredFile} from "nestjs-form-data"
import * as crypto from "crypto"
import * as fs from "fs"



@Injectable()
export class FileService {
    async saveFile( photo: MemoryStoredFile){
        const uuid = crypto.randomUUID();

        const name = uuid + "." + photo.extension;

        await fs.promises.writeFile("./public/" + name, photo.buffer)

        return "/" + name
    }
}