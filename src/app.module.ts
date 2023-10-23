import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBase } from 'config/database';
import { User } from 'entities/user.entity';
import { UserService } from './services/user/user.service';
import { TStandard } from 'entities/TStandard';
import { Telefon } from 'entities/Telefon';
import { Proizvodjac } from 'entities/Proizvodjac';
import { OperativniSistem } from 'entities/OperativniSistem';
import { Artikl } from 'entities/Artikl';
import { UserController } from './controllers/api/user.controller';
import { PhoneController } from './controllers/api/telefon.controller';
import { PhoneService } from './services/phone/phone.service';
import { SystemController } from './controllers/api/system.controller';
import { TstandardController } from './controllers/api/tstandard.controller';
import { ProizvodjacController } from './controllers/api/proizvodjac.controller';
import { ArtiklController } from './controllers/api/artikl.controller';
import { SystemService } from './services/system/system.service';
import { TstandardService } from './services/tstandard/tstandard.service';
import { ProizvodjacService } from './services/proizvodjac/proizvodjac.service';
import { ArtiklService } from './services/artikl/artikl.service';


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

    TypeOrmModule.forFeature([ 
      User,
      Telefon
    ])

  ],
  controllers: [
    AppController,
    UserController,
    PhoneController,
    SystemController,
    TstandardController,
    ProizvodjacController,
    ArtiklController,
  ],
  providers: [
    UserService,
    PhoneService,
    SystemService,
    TstandardService,
    ProizvodjacService,
    ArtiklService,
  ],
})
export class AppModule {}
