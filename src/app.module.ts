import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBase } from 'config/database';
import { User } from 'src/entities/user.entity';
import { UserService } from './services/user/user.service';
import { TStandard } from 'src/entities/TStandard';
import { Telefon } from 'src/entities/Telefon';
import { Proizvodjac } from 'src/entities/Proizvodjac';
import { OperativniSistem } from 'src/entities/OperativniSistem';
import { Artikl } from 'src/entities/Artikl';
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
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { Photo } from 'src/entities/Photo';
import { PhotoController } from './controllers/api/photo.controller';
import { FileService } from './services/file/file.service';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { PhotoService } from './services/photo/photo.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DataBase.hostname,
      port: 3306,
      username: DataBase.username,
      password: DataBase.password,
      database: DataBase.database,
      autoLoadEntities: true
      
      
    }),
    TypeOrmModule.forFeature([ 
      User,
      Telefon,
      OperativniSistem,
      TStandard,
      Proizvodjac,
      Artikl,
      Photo
    ]),
    
    NestjsFormDataModule.config({
        storage: MemoryStoredFile,
    })

  ],
  controllers: [
    AppController,
    UserController,
    PhoneController,
    SystemController,
    TstandardController,
    ProizvodjacController,
    ArtiklController,
    AuthController,
    PhotoController
  ],
  providers: [
    UserService,
    PhoneService,
    SystemService,
    TstandardService,
    ProizvodjacService,
    ArtiklService,
    FileService,
    PhotoService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(AuthMiddleware)
    .exclude('auth/*')
    .forRoutes('api/*')
    
  }
}
