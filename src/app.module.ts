import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBase } from 'config/database';
import { User } from 'entities/user.entity';
import { UserService } from './services/user/user.service';
import { TStandard } from 'entities/TStandard';
import { Telefon } from 'entities/Telefon';
import { Proizvodjac } from 'entities/Proizvodjac';
import { OperativniSistem } from 'entities/OperativniSistem';
import { Artikl } from 'entities/Artikl';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DataBase.hostname,
      port: 3306,
      username: DataBase.username,
      password: DataBase.password,
      database: DataBase.database,
      entities: [ User, TStandard, Telefon, Proizvodjac, OperativniSistem, Artikl ]
      
      
    }),

    TypeOrmModule.forFeature([ User ])

  ],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule {}
