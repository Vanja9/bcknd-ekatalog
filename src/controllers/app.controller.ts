import { Controller, Get } from '@nestjs/common';
import { User } from 'entities/user.entity';
import { UserService } from '../services/user/user.service';
;

@Controller()
export class AppController {

constructor(
  private userService: UserService
){ }

  @Get()  //https://localhost:3000
  getHello(): string {
    return 'Hello World';
}

@Get('world') //https://localhost:3000/world
getWorld(): string {
  return 'World';

}



}
