import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { resolve } from 'path';
import { AddUserDto } from 'src/dtos/user/add.user.dto';
import { EditUserDto } from 'src/dtos/user/edite.user.dto';
import { ApiRes } from 'src/misc/api.response.class';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private readonly user: Repository<User>,
    ) {  }

    async getAll(): Promise<User[]>{
        return await this.user.find();
    }

    async getById(id: number){
        return await this.user.findOne({
            where: {
                userId: id
            }
        });   
    }


    async getAdmin(username: string){
        return await this.user.findOne({
            where: {
                username: username,
                isAdmin : true
                
            }
        })
    }

    async add(data: AddUserDto)/* : Promise<User | ApiRes> */ {
        const crypto = require('crypto');
        const passwordHash = crypto.createHash('sha512')
        passwordHash.update(data.password)
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let newUser: User = new User();
        newUser.username = data.username;
        newUser.passwordHash = passwordHashString;
        newUser.isAdmin = data.isAdmin

        try {
            return await this.user.save(newUser);
        } catch {
            return new ApiRes("error", -1001, "Vec postoji korisnik sa tim imenom");
        }

 /*        return new Promise((resolve) => {
            this.user.save(newUser)
            .then(data => resolve(data))
            .catch(error => {
                const response: ApiRes = new ApiRes("error", -1001, "Vec postoji korisnik sa tim imenom")
                resolve(response)
            })
        })
        
 */
    }

    async editById(id: number, data: EditUserDto): Promise<User | ApiRes>{
        let user: User = await this.user.findOne({
            where: {
                userId: id
            }
        });

        if (user == undefined){
            return new ApiRes("error", -1002, null);
        }

        const crypto = require('crypto');

        const passwordHash = crypto.createHash('sha512')
        passwordHash.update(data.password)

        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        
        user.passwordHash = passwordHashString;
        user.isAdmin = data.isAdmin;

        try{
            return await this.user.save(user)
        } catch{ return new ApiRes("error", -1005, null);

        }

    }

}
